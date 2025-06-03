// src/lib/tasks/executeUpdateAmmData.ts
import { PrismaClient, TokenPrice, Token, Ammpair, StakingPool } from '@prisma/client';
import { NetworkConfig } from '../TaskProcessor'; // Asumiendo que TaskProcessor exporta esto
import { createLogger } from '@/app/indexer/utils'; // Asegúrate que la ruta sea correcta
import Decimal from 'decimal.js'; // Para cálculos precisos

const logger = createLogger('executeUpdateAmmData-task');

// Helper para convertir montos raw a valor con decimales
function toDisplayAmount(rawAmount: string | bigint | null | undefined, decimals: number | null | undefined): Decimal {
  if (rawAmount === null || rawAmount === undefined || decimals === null || decimals === undefined) {
    return new Decimal(0);
  }
  try {
    return new Decimal(rawAmount.toString()).div(new Decimal(10).pow(decimals));
  } catch (error) {
    logger.error(`Error converting rawAmount: ${rawAmount} with decimals: ${decimals}`, error);
    return new Decimal(0);
  }
}


export async function executeUpdateAmmData(prisma: PrismaClient, config: NetworkConfig): Promise<void> {
  logger.info(`Starting TVL and stats update for network: ${config.networkName}`);

  try {
    // --- 1. Obtener todos los tokens con sus precios y decimales ---
    // Necesitamos los precios actuales y los decimales para las conversiones
    const tokensWithPricesAndDetails = await prisma.token.findMany({
      where: { network: config.networkName },
      include: {
        // Suponiendo que tienes una relación o una forma de obtener el precio actual.
        // Si TokenPrice es una tabla separada, podríamos necesitar un join o una consulta separada.
        // Por ahora, asumimos que priceUsdCurrent está en Token y se actualiza de alguna manera.
        // Si no, tendríamos que consultar TokenPrice por separado.
        // Vamos a hacerlo consultando TokenPrice explícitamente.
      },
    });

    const tokenPrices = await prisma.tokenPrice.findMany({
      where: { network: config.networkName },
    });

    // Crear mapas para acceso rápido
    const pricesMap = new Map<string, Decimal>(); // tokenAddress -> priceUsd
    tokenPrices.forEach(tp => {
      if (tp.priceUsd) {
        pricesMap.set(tp.tokenAddress, tp.priceUsd);
      }
    });

    const decimalsMap = new Map<string, number>(); // tokenAddress -> decimals
    tokensWithPricesAndDetails.forEach(t => {
      if (t.decimals !== null) {
        decimalsMap.set(t.id, t.decimals); // t.id es tokenAddress
      }
    });

    let totalAmmTvlUsd = new Decimal(0);
    const ammPairUpdates: any[] = []; // Para batch update

    // --- 2. Calcular y actualizar TVL para Ammpairs ---
    const ammPairs = await prisma.ammpair.findMany({
      where: { network: config.networkName },
    });

    logger.info(`Processing ${ammPairs.length} AMM pairs for ${config.networkName}`);

    for (const pair of ammPairs) {
      const token0Address = pair.token0Address;
      const token1Address = pair.token1Address;

      const price0Usd = pricesMap.get(token0Address);
      const price1Usd = pricesMap.get(token1Address);

      const decimals0 = decimalsMap.get(token0Address);
      const decimals1 = decimalsMap.get(token1Address);

      let pairTvlUsd = new Decimal(0);

      if (pair.reserve0 && price0Usd && decimals0 !== undefined) {
        const amount0 = toDisplayAmount(pair.reserve0, decimals0);
        pairTvlUsd = pairTvlUsd.plus(amount0.mul(price0Usd));
      } else {
        logger.warn(`Missing price or decimals for token0 ${token0Address} in pair ${pair.pair}`);
      }

      if (pair.reserve1 && price1Usd && decimals1 !== undefined) {
        const amount1 = toDisplayAmount(pair.reserve1, decimals1);
        pairTvlUsd = pairTvlUsd.plus(amount1.mul(price1Usd));
      } else {
        logger.warn(`Missing price or decimals for token1 ${token1Address} in pair ${pair.pair}`);
      }

      ammPairUpdates.push(
        prisma.ammpair.update({
          where: { id: pair.id },
          data: {
            tvlUsd: pairTvlUsd.toFixed(6), // Guardar con 6 decimales de precisión
            lastStatsUpdate: new Date(),
          },
        })
      );
      totalAmmTvlUsd = totalAmmTvlUsd.plus(pairTvlUsd);
    }
    logger.info(`Total AMM TVL for ${config.networkName}: ${totalAmmTvlUsd.toFixed(6)} USD`);


    // --- 3. Calcular y actualizar TVL para StakingPools ---
    let totalStakingTvlUsd = new Decimal(0);
    const stakingPoolUpdates: any[] = [];

    const stakingPools = await prisma.stakingPool.findMany({
      where: { network: config.networkName },
      // include: { stakeToken: true } // Si quieres acceder a stakeToken.decimals directamente
    });
    logger.info(`Processing ${stakingPools.length} Staking pools for ${config.networkName}`);

    for (const pool of stakingPools) {
      // totalStakedAmount ya debería estar actualizado por executeGetTotalStakedForAllPools
      const stakeTokenAddress = pool.stakeTokenAddress;
      const priceStakeTokenUsd = pricesMap.get(stakeTokenAddress);
      const decimalsStakeToken = decimalsMap.get(stakeTokenAddress);

      let poolTvlUsd = new Decimal(0);

      if (pool.totalStakedAmount && priceStakeTokenUsd && decimalsStakeToken !== undefined) {
        const amountStaked = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken);
        poolTvlUsd = amountStaked.mul(priceStakeTokenUsd);
      } else {
        logger.warn(`Missing price or decimals for stake token ${stakeTokenAddress} in pool ${pool.id}`);
      }

      stakingPoolUpdates.push(
        prisma.stakingPool.update({
          where: { id: pool.id },
          data: {
            cachedTvlUsd: poolTvlUsd.toFixed(6),
            // cachedStakerCount: ... (si lo calculas aquí también)
          },
        })
      );
      totalStakingTvlUsd = totalStakingTvlUsd.plus(poolTvlUsd);
    }
    logger.info(`Total Staking TVL for ${config.networkName}: ${totalStakingTvlUsd.toFixed(6)} USD`);

    // --- 4. Actualizar ProtocolStats ---
    const now = new Date();
    // Crear un timestamp para el snapshot, ej., al inicio de la hora actual
    const snapshotTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);

    const totalPlatformTvlUsd = totalAmmTvlUsd.plus(totalStakingTvlUsd);
    // Aquí podrías añadir virtualPoolsTvlUsd si lo calculas de forma similar

    const protocolStatsUpdate = prisma.protocolStats.upsert({
      where: {
        unique_protocol_stats_snapshot: { // Usando el nombre de tu constraint único
          network: config.networkName,
          timestamp: snapshotTimestamp,
        }
      },
      update: {
        totalTvlUsd: totalPlatformTvlUsd.toFixed(6),
        ammTvlUsd: totalAmmTvlUsd.toFixed(6),
        stakingTvlUsd: totalStakingTvlUsd.toFixed(6),
        // virtualPoolsTvlUsd: ... (si aplica)
        // También podrías actualizar otros campos como ammVolume24hUsd si los calculas aquí
      },
      create: {
        network: config.networkName,
        timestamp: snapshotTimestamp,
        totalTvlUsd: totalPlatformTvlUsd.toFixed(6),
        ammTvlUsd: totalAmmTvlUsd.toFixed(6),
        stakingTvlUsd: totalStakingTvlUsd.toFixed(6),
        // virtualPoolsTvlUsd: ... (si aplica)
      },
    });

    // --- 5. Ejecutar todas las actualizaciones en una transacción ---
    logger.info('Executing database updates in a transaction...');
    await prisma.$transaction([
      ...ammPairUpdates,
      ...stakingPoolUpdates,
      protocolStatsUpdate, // Esto es una sola operación de upsert
    ]);

    logger.info(`Successfully updated TVL and stats for network: ${config.networkName}`);

  } catch (error) {
    logger.error(`Error during TVL and stats update for ${config.networkName}:`, error);
  }
}