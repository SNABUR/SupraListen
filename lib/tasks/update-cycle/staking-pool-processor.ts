import { PrismaClient, staking_pools } from '../../../prisma/generated/main_db';
import Decimal from 'decimal.js';
import { BaseData } from './data-fetcher';
import { NetworkConfig } from '../../TaskProcessor';
import { toDisplayAmount } from './utils';

const SECONDS_IN_YEAR = new Decimal(365 * 24 * 60 * 60);
const CONTRACT_RPS_SCALE_FACTOR = new Decimal("1000000000000");

// --- Funciones Auxiliares ---

function calculateStakingPoolApr(
  pool: staking_pools,
  pricesMap: Map<string, Decimal>,
  decimalsMap: Map<string, number>
): string | null {
  try {
    const { rewardTokenAddress, stakeTokenAddress } = pool;
    const priceRewardTokenUsd = pricesMap.get(rewardTokenAddress);
    const decimalsRewardToken = decimalsMap.get(rewardTokenAddress);
    const priceStakeTokenUsd = pricesMap.get(stakeTokenAddress);
    const decimalsStakeToken = decimalsMap.get(stakeTokenAddress);

    if (!priceRewardTokenUsd || decimalsRewardToken === undefined || !priceStakeTokenUsd || decimalsStakeToken === undefined) {
        console.log(`[LOG] calculateStakingPoolApr: Faltan datos para el pool ${pool.id}. Omitiendo cálculo de APR.`);
        return null;
    }
    if (new Decimal(pool.rewardPerSec).isZero() || new Decimal(pool.totalStakedAmount).isZero() || priceStakeTokenUsd.isZero()) {
        console.log(`[LOG] calculateStakingPoolApr: Datos cero para el pool ${pool.id} (rewardPerSec, totalStakedAmount, o priceStakeTokenUsd). Retornando 0.00.`);
        return '0.00';
    }

    const rewardPerSec_base_units = new Decimal(pool.rewardPerSec).div(CONTRACT_RPS_SCALE_FACTOR);
    const rewardPerSec_full_tokens = toDisplayAmount(rewardPerSec_base_units.toFixed(), decimalsRewardToken);
    const annualRewards_Usd = rewardPerSec_full_tokens.mul(SECONDS_IN_YEAR).mul(priceRewardTokenUsd);
    const totalStaked_Usd = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken).mul(priceStakeTokenUsd);

    if (totalStaked_Usd.isZero()) {
        console.log(`[LOG] calculateStakingPoolApr: TVL calculado es cero para el pool ${pool.id}. Retornando 0.00.`);
        return '0.00';
    }
    const apr = annualRewards_Usd.div(totalStaked_Usd).mul(100);
    const finalApr = (apr.isNaN() || !apr.isFinite()) ? null : apr.toFixed(2);
    console.log(`[LOG] calculateStakingPoolApr: Pool ${pool.id} - APR calculado: ${finalApr}`);
    return finalApr;
  } catch (error) {
    console.error(`Error calculating APR for pool ${pool.id}:`, { error });
    return null;
  }
}

// --- Procesador Principal del Módulo ---

export async function processStakingPools(spikeDB: PrismaClient, config: NetworkConfig, baseData: BaseData) {
    console.log(`[LOG] processStakingPools: Iniciando para la red ${config.networkName}`);
    const stakingPools = await spikeDB.staking_pools.findMany({ where: { network: config.networkName } });
    console.log(`[LOG] processStakingPools: ${stakingPools.length} pools de staking encontrados.`);
    
    let totalStakingTvlUsd = new Decimal(0);
    const stakingPoolUpdatePromises = [];

    for (const pool of stakingPools) {
        const priceStakeTokenUsd = baseData.pricesMap.get(pool.stakeTokenAddress);
        const decimalsStakeToken = baseData.decimalsMap.get(pool.stakeTokenAddress);
        let poolTvlUsd = new Decimal(0);

        if (pool.totalStakedAmount && priceStakeTokenUsd && decimalsStakeToken !== undefined) {
            poolTvlUsd = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken).mul(priceStakeTokenUsd);
        }
        console.log(`[LOG] processStakingPools: Pool ${pool.id} - TVL calculado: ${poolTvlUsd.toFixed(2)} USD`);

        const apr = calculateStakingPoolApr(pool, baseData.pricesMap, baseData.decimalsMap);
        totalStakingTvlUsd = totalStakingTvlUsd.plus(poolTvlUsd);

        stakingPoolUpdatePromises.push(
            spikeDB.staking_pools.update({
                where: { id: pool.id },
                data: { cachedTvlUsd: poolTvlUsd.toFixed(2), cachedApy: apr },
            })
        );
    }
    console.log(`[LOG] processStakingPools: Finalizado. TVL total de Staking: ${totalStakingTvlUsd.toFixed(2)} USD`);
    return {
        stakingPoolUpdatePromises,
        totalStakingTvlUsd,
    };
}
