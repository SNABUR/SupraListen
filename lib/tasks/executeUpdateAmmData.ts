// src/lib/tasks/executeUpdateAmmData.ts
import { PrismaClient, staking_pools } from '@prisma/client'; // Ammpair, Token, TokenPrice no son necesarios directamente en la firma de la función externa
import { NetworkConfig } from '../TaskProcessor';
import { createLogger } from '@/app/indexer/utils';
import Decimal from 'decimal.js';

const logger = createLogger('executeUpdateAmmData-task');
const SECONDS_IN_YEAR = new Decimal(365 * 24 * 60 * 60);
const CONTRACT_RPS_SCALE_FACTOR = new Decimal("1000000000000"); // Tu factor de 10^12

// Helper para convertir montos raw a valor con decimales (Decimal)
function toDisplayAmount(rawAmount: string | bigint | null | undefined, decimals: number | null | undefined): Decimal {
  if (rawAmount === null || rawAmount === undefined || decimals === null || decimals === undefined || decimals < 0) {
    // logger.warn(`Invalid input for toDisplayAmount: rawAmount=${rawAmount}, decimals=${decimals}`);
    return new Decimal(0);
  }
  try {
    // Asegurarse que rawAmount es un string para Decimal.js
    const amountStr = typeof rawAmount === 'bigint' ? rawAmount.toString() : String(rawAmount);
    return new Decimal(amountStr).div(new Decimal(10).pow(decimals));
  } catch (error) {
    logger.error(`Error converting rawAmount: ${rawAmount} with decimals: ${decimals}`, error);
    return new Decimal(0);
  }
}

// Nueva función para calcular el APR de un Staking Pool
function calculateStakingPoolApr(
  pool: staking_pools, // Prisma staking_pools type
  pricesMap: Map<string, Decimal>, // tokenAddress -> priceUsd
  decimalsMap: Map<string, number> // tokenAddress -> decimals
): string | null {
  try {
    const rewardTokenAddress = pool.rewardTokenAddress;
    const stakeTokenAddress = pool.stakeTokenAddress;

    const priceRewardTokenUsd = pricesMap.get(rewardTokenAddress);
    const decimalsRewardToken = decimalsMap.get(rewardTokenAddress); // Ya no se usa directamente para RPS si el factor lo maneja

    const priceStakeTokenUsd = pricesMap.get(stakeTokenAddress);
    const decimalsStakeToken = decimalsMap.get(stakeTokenAddress); // Sigue siendo necesario para el stakeToken

    // Validaciones esenciales
    if (!priceRewardTokenUsd || decimalsRewardToken === undefined || // <-- CORRECCIÓN: Ahora es mandatorio
       !priceStakeTokenUsd || decimalsStakeToken === undefined) {
      logger.warn(`Pool ${pool.id}: Missing price or decimals for tokens. RewardPrice: ${!!priceRewardTokenUsd}, RewardDecimals: ${decimalsRewardToken !== undefined}, StakePrice: ${!!priceStakeTokenUsd}, StakeDecimals: ${decimalsStakeToken !== undefined}`);
      return null;
    }

    if (new Decimal(pool.rewardPerSec).isZero()) {
      return '0.00';
    }
    
    if (new Decimal(pool.totalStakedAmount).isZero() || priceStakeTokenUsd.isZero()) {
      return '0.00';
    }

    // 1. Calcular recompensas por segundo en "tokens enteros de recompensa"
    //    dividiendo por el CONTRACT_RPS_SCALE_FACTOR.
    const rewardPerSec_raw = new Decimal(pool.rewardPerSec);
    const rewardPerSec_base_units = rewardPerSec_raw.div(CONTRACT_RPS_SCALE_FACTOR);
    const rewardPerSec_full_tokens = toDisplayAmount(rewardPerSec_base_units.toFixed(), decimalsRewardToken);
    const annualRewards_full_tokens = rewardPerSec_full_tokens.mul(SECONDS_IN_YEAR);

    const annualRewards_Usd = annualRewards_full_tokens.mul(priceRewardTokenUsd);

    // 3. Calcular total stakeado en tokens de stake (enteros)
    //    Esto sigue usando toDisplayAmount porque totalStakedAmount está en unidades base del stakeToken
    const totalStaked_tokens = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken);
    
    // 4. Calcular valor USD del total stakeado
    const totalStaked_Usd = totalStaked_tokens.mul(priceStakeTokenUsd);

    // 5. Calcular APR
    if (totalStaked_Usd.isZero()) {
        return '0.00';
    }

    const apr = annualRewards_Usd.div(totalStaked_Usd).mul(100);

    if (apr.isNaN() || !apr.isFinite()) {
        logger.warn(`Pool ${pool.id}: Calculated APR is NaN or Infinite. Inputs: annualRewards_Usd=${annualRewards_Usd}, totalStaked_Usd=${totalStaked_Usd}`);
        return null;
    }

    return apr.toFixed(2);

  } catch (error) {
    logger.error(`Error calculating APR for pool ${pool.id}:`, error);
    return null;
  }
}


export async function executeUpdateAmmData(prisma: PrismaClient, config: NetworkConfig): Promise<void> {
  logger.info(`Starting TVL, stats, and APR update for network: ${config.networkName}`);

  try {
    // --- 1. Obtener todos los tokens con sus precios y decimales ---
    const tokensWithDetails = await prisma.tokens.findMany({ // Renombrado para claridad
      where: { network: config.networkName },
    });

    const tokenPrices = await prisma.token_prices.findMany({
      where: { network: config.networkName },
    });

    // Crear mapas para acceso rápido
    const pricesMap = new Map<string, Decimal>(); // tokenAddress -> priceUsd
    tokenPrices.forEach(tp => {
      if (tp.priceUsd) { // priceUsd es Decimal? o string? Asegúrate de que sea Decimal
        pricesMap.set(tp.tokenAddress, new Decimal(tp.priceUsd.toString())); // Convertir a Decimal si es necesario
      }
    });

    const decimalsMap = new Map<string, number>(); // tokenAddress -> decimals
    tokensWithDetails.forEach(t => {
      if (t.decimals !== null) {
        decimalsMap.set(t.id, t.decimals); // t.id es tokenAddress
      }
    });

    let totalAmmTvlUsd = new Decimal(0);
    const ammPairUpdates: any[] = [];

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
        if (!price0Usd) logger.warn(`Missing price for token0 ${token0Address} in pair ${pair.pair}`);
        if (decimals0 === undefined) logger.warn(`Missing decimals for token0 ${token0Address} in pair ${pair.pair}`);
      }

      if (pair.reserve1 && price1Usd && decimals1 !== undefined) {
        const amount1 = toDisplayAmount(pair.reserve1, decimals1);
        pairTvlUsd = pairTvlUsd.plus(amount1.mul(price1Usd));
      } else {
        if (!price1Usd) logger.warn(`Missing price for token1 ${token1Address} in pair ${pair.pair}`);
        if (decimals1 === undefined) logger.warn(`Missing decimals for token1 ${token1Address} in pair ${pair.pair}`);
      }

      ammPairUpdates.push(
        prisma.ammpair.update({
          where: { id: pair.id },
          data: {
            tvlUsd: pairTvlUsd.toFixed(6),
            lastStatsUpdate: new Date(),
          },
        })
      );
      totalAmmTvlUsd = totalAmmTvlUsd.plus(pairTvlUsd);
    }
    if (ammPairs.length > 0) {
        logger.info(`Total AMM TVL for ${config.networkName}: ${totalAmmTvlUsd.toFixed(6)} USD`);
    }


    // --- 3. Calcular y actualizar TVL y APR para StakingPools ---
    let totalStakingTvlUsd = new Decimal(0);
    const stakingPoolUpdates: any[] = [];

    // Asegúrate de incluir las relaciones necesarias si no están en los maps,
    // pero con los maps ya deberíamos tener todo.
    const stakingPools = await prisma.staking_pools.findMany({
      where: { network: config.networkName },
    });
    logger.info(`Processing ${stakingPools.length} Staking pools for ${config.networkName}`);

    for (const pool of stakingPools) {
      const stakeTokenAddress = pool.stakeTokenAddress;
      const priceStakeTokenUsd = pricesMap.get(stakeTokenAddress);
      const decimalsStakeToken = decimalsMap.get(stakeTokenAddress);

      let poolTvlUsd = new Decimal(0);

      if (pool.totalStakedAmount && priceStakeTokenUsd && decimalsStakeToken !== undefined) {
        const amountStaked = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken);
        poolTvlUsd = amountStaked.mul(priceStakeTokenUsd);
      } else {
        // logger.warn(`Pool ${pool.id}: Missing price or decimals for stake token ${stakeTokenAddress} for TVL calculation.`);
      }

      // Calcular APR (que se guardará en cachedApy)
      const apr = calculateStakingPoolApr(pool, pricesMap, decimalsMap);

      stakingPoolUpdates.push(
        prisma.staking_pools.update({
          where: { id: pool.id },
          data: {
            cachedTvlUsd: poolTvlUsd.toFixed(2),
            cachedApy: apr, // Guardamos el APR calculado aquí
          },
        })
      );
      totalStakingTvlUsd = totalStakingTvlUsd.plus(poolTvlUsd);
    }
    if (stakingPools.length > 0) {
        logger.info(`Total Staking TVL for ${config.networkName}: ${totalStakingTvlUsd.toFixed(6)} USD`);
    }


    // --- 4. Actualizar ProtocolStats ---
    const now = new Date();
    const snapshotTimestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0);

    const totalPlatformTvlUsd = totalAmmTvlUsd.plus(totalStakingTvlUsd);

    const protocolStatsUpdate = prisma.protocol_stats.upsert({
      where: {
        network_timestamp: {
          network: config.networkName,
          timestamp: snapshotTimestamp,
        }
      },
      update: {
        totalTvlUsd: totalPlatformTvlUsd.toFixed(6),
        ammTvlUsd: totalAmmTvlUsd.toFixed(6),
        stakingTvlUsd: totalStakingTvlUsd.toFixed(6),
      },
      create: {
        network: config.networkName,
        timestamp: snapshotTimestamp,
        totalTvlUsd: totalPlatformTvlUsd.toFixed(6),
        ammTvlUsd: totalAmmTvlUsd.toFixed(6),
        stakingTvlUsd: totalStakingTvlUsd.toFixed(6),
      },
    });

    // --- 5. Ejecutar todas las actualizaciones en una transacción ---
    const updatesToExecute = [...ammPairUpdates, ...stakingPoolUpdates];
    if (updatesToExecute.length > 0) {
        logger.info(`Executing ${updatesToExecute.length} AMM/Staking pool updates and 1 ProtocolStats update in a transaction...`);
        await prisma.$transaction([
          ...updatesToExecute,
          protocolStatsUpdate,
        ]);
    } else {
        logger.info('No AMM/Staking pool updates to execute. Updating ProtocolStats only...');
        await prisma.$transaction([protocolStatsUpdate]); // Aún actualiza ProtocolStats
    }


    logger.info(`Successfully updated TVL, stats, and APRs for network: ${config.networkName}`);

  } catch (error) {
    logger.error(`Error during TVL, stats, and APR update for ${config.networkName}:`, error);
  }
}