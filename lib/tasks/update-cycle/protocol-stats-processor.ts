import { PrismaClient } from '@prisma/client';
import { NetworkConfig } from '../../TaskProcessor';
import Decimal from 'decimal.js';

export function prepareProtocolStatsUpdate(
    spikeDB: PrismaClient,
    config: NetworkConfig,
    totalAmmTvlUsd: Decimal,
    totalStakingTvlUsd: Decimal
) {
    const now = new Date();
    const snapshotTimestamp = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), 0, 0, 0));
    const totalPlatformTvlUsd = totalAmmTvlUsd.plus(totalStakingTvlUsd);

    return spikeDB.protocol_stats.upsert({
        where: { network_timestamp: { network: config.networkName, timestamp: snapshotTimestamp } },
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
}
