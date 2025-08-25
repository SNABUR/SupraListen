
import { PrismaClient as OhlcPrismaClient } from '../prisma/generated/ohlc_db';
import { PrismaClient as MainPrismaClient } from '../prisma/generated/main_db';
import { fetchAmmPairsToProcess, fetchBaseData } from '../lib/tasks/update-cycle/data-fetcher';
import { NetworkConfig } from '../lib/TaskProcessor';

const ohlcDB = new OhlcPrismaClient();
const spikeDB = new MainPrismaClient();

const config: NetworkConfig = {
    networkName: 'supra-mainnet',
    rpc: 'mock-rpc',
    chain_id: 1,
    protocol_fee_recipient: 'mock-fee-recipient',
    staking_address: 'mock-staking-address',
    factory_address: 'mock-factory-address',
    router_address: 'mock-router-address',
    weth_address: 'mock-weth-address',
    start_block: 0,
    step: 1000,
    max_retries: 3,
    retry_delay: 1000,
};

function getPairKey(token0: string, token1: string): string {
    return [token0, token1].sort().join('-').toLowerCase();
}

async function crossReferencePairs() {
    console.log('--- Running Pair Cross-Reference Diagnostic ---');

    try {
        // 1. Get AMM pairs and their canonical keys
        console.log('Fetching AMM pairs and legacy map...');
        const baseData = await fetchBaseData(spikeDB, config);
        const ammPairs = await fetchAmmPairsToProcess(spikeDB, config);

        const ammPairKeys = new Set<string>();
        for (const pair of ammPairs) {
            const canonicalToken0 = baseData.legacyToWrappedMap.get(pair.token0Address) ?? pair.token0Address;
            const canonicalToken1 = baseData.legacyToWrappedMap.get(pair.token1Address) ?? pair.token1Address;
            ammPairKeys.add(getPairKey(canonicalToken0, canonicalToken1));
        }
        console.log(`Found ${ammPairKeys.size} unique AMM pairs to process.`);

        // 2. Get pairs with recent 1d volume and their canonical keys
        console.log('Fetching pairs with recent 1d volume...');
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const ohlcRecords = await ohlcDB.ohlcData.findMany({
            where: {
                network: 'supra-mainnet',
                timeframe: '1d',
                ammSource: 'SpikeySwap',
                timestamp: { gte: sevenDaysAgo },
            },
            select: {
                token0Address: true,
                token1Address: true,
            }
        });

        const volumePairKeys = new Set<string>();
        for (const ohlc of ohlcRecords) {
            const canonicalToken0 = baseData.legacyToWrappedMap.get(ohlc.token0Address) ?? ohlc.token0Address;
            const canonicalToken1 = baseData.legacyToWrappedMap.get(ohlc.token1Address) ?? ohlc.token1Address;
            volumePairKeys.add(getPairKey(canonicalToken0, canonicalToken1));
        }
        console.log(`Found ${volumePairKeys.size} unique pairs with volume in the last 7 days.`);

        // 3. Compare the sets
        console.log('--- Diagnostic Complete ---');
        const pairsWithVolume = new Set([...ammPairKeys].filter(key => volumePairKeys.has(key)));
        const pairsWithoutVolume = new Set([...ammPairKeys].filter(key => !volumePairKeys.has(key)));
        const volumeWithoutPair = new Set([...volumePairKeys].filter(key => !ammPairKeys.has(key)));

        console.log(`Found ${pairsWithVolume.size} AMM pairs that HAVE recent volume data.`);
        if (pairsWithVolume.size > 0) {
            console.log('Pairs with volume:', Array.from(pairsWithVolume));
        }

        console.log(`Found ${pairsWithoutVolume.size} AMM pairs that DO NOT HAVE recent volume data.`);
        if (pairsWithoutVolume.size > 0) {
            console.error('Pairs without volume:', Array.from(pairsWithoutVolume));
        }

        if (volumeWithoutPair.size > 0) {
            console.warn(`Found ${volumeWithoutPair.size} pairs with volume data that are NOT in the AMM pair list.`);
            console.warn('Volume data for non-existent pairs:', Array.from(volumeWithoutPair));
        }

    } catch (error) {
        console.error('An error occurred during the diagnostic:', error);
    } finally {
        await spikeDB.$disconnect();
        await ohlcDB.$disconnect();
    }
}

crossReferencePairs();
