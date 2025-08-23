import { PrismaClient } from '../../../prisma/generated/main_db';
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

    console.log(`[LOG] prepareProtocolStatsUpdate: Preparando estadísticas para la red ${config.networkName} en el timestamp ${snapshotTimestamp.toISOString()}`);
    console.log(`[LOG] prepareProtocolStatsUpdate: TVL Total de la Plataforma: ${totalPlatformTvlUsd.toFixed(6)} USD`);
    console.log(`[LOG] prepareProtocolStatsUpdate: TVL de AMM: ${totalAmmTvlUsd.toFixed(6)} USD`);
    console.log(`[LOG] prepareProtocolStatsUpdate: TVL de Staking: ${totalStakingTvlUsd.toFixed(6)} USD`);

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