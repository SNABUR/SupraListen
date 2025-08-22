import { PrismaClient, staking_pools } from '@prisma/client';
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

    if (!priceRewardTokenUsd || decimalsRewardToken === undefined || !priceStakeTokenUsd || decimalsStakeToken === undefined) return null;
    if (new Decimal(pool.rewardPerSec).isZero() || new Decimal(pool.totalStakedAmount).isZero() || priceStakeTokenUsd.isZero()) return '0.00';

    const rewardPerSec_base_units = new Decimal(pool.rewardPerSec).div(CONTRACT_RPS_SCALE_FACTOR);
    const rewardPerSec_full_tokens = toDisplayAmount(rewardPerSec_base_units.toFixed(), decimalsRewardToken);
    const annualRewards_Usd = rewardPerSec_full_tokens.mul(SECONDS_IN_YEAR).mul(priceRewardTokenUsd);
    const totalStaked_Usd = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken).mul(priceStakeTokenUsd);

    if (totalStaked_Usd.isZero()) return '0.00';
    const apr = annualRewards_Usd.div(totalStaked_Usd).mul(100);
    return (apr.isNaN() || !apr.isFinite()) ? null : apr.toFixed(2);
  } catch (error) {
    console.error(`Error calculating APR for pool ${pool.id}:`, { error });
    return null;
  }
}

// --- Procesador Principal del Módulo ---

export async function processStakingPools(spikeDB: PrismaClient, config: NetworkConfig, baseData: BaseData) {
    const stakingPools = await spikeDB.staking_pools.findMany({ where: { network: config.networkName } });
    
    let totalStakingTvlUsd = new Decimal(0);
    const stakingPoolUpdatePromises = [];

    for (const pool of stakingPools) {
        const priceStakeTokenUsd = baseData.pricesMap.get(pool.stakeTokenAddress);
        const decimalsStakeToken = baseData.decimalsMap.get(pool.stakeTokenAddress);
        let poolTvlUsd = new Decimal(0);

        if (pool.totalStakedAmount && priceStakeTokenUsd && decimalsStakeToken !== undefined) {
            poolTvlUsd = toDisplayAmount(pool.totalStakedAmount, decimalsStakeToken).mul(priceStakeTokenUsd);
        }

        const apr = calculateStakingPoolApr(pool, baseData.pricesMap, baseData.decimalsMap);
        totalStakingTvlUsd = totalStakingTvlUsd.plus(poolTvlUsd);

        stakingPoolUpdatePromises.push(
            spikeDB.staking_pools.update({
                where: { id: pool.id },
                data: { cachedTvlUsd: poolTvlUsd.toFixed(2), cachedApy: apr },
            })
        );
    }

    return {
        stakingPoolUpdatePromises,
        totalStakingTvlUsd,
    };
}