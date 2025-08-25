
import { PrismaClient as MainPrismaClient } from '../prisma/generated/main_db';
import { fetchAmmPairsToProcess, fetchBaseData } from '../lib/tasks/update-cycle/data-fetcher';
import { NetworkConfig } from '../lib/TaskProcessor';
import { toDisplayAmount } from '../lib/tasks/update-cycle/utils';
import Decimal from 'decimal.js';

const spikeDB = new MainPrismaClient();

// Mock NetworkConfig
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

async function diagnoseAmmPairs() {
    console.log('--- Running AMM Pair Diagnostic ---');

    try {
        // 1. Fetch base data and pairs
        console.log('Fetching base data and AMM pairs...');
        const baseData = await fetchBaseData(spikeDB, config);
        const ammPairs = await fetchAmmPairsToProcess(spikeDB, config);

        console.log(`Loaded ${baseData.pricesMap.size} prices.`);
        console.log(`Loaded ${baseData.decimalsMap.size} decimals mappings.`);
        console.log(`Loaded ${baseData.legacyToWrappedMap.size} legacy mappings.`);
        console.log(`Found ${ammPairs.length} AMM pairs to process.`);
        console.log(`Swap Fee BPS: ${baseData.swapFeeBps}`);

        if (!baseData.swapFeeBps) {
            console.error('CRITICAL: swapFeeBps is null or undefined. All APR calculations will fail.');
        }

        // 2. Iterate and diagnose each pair
        let pairsWithZeroTvl = 0;
        const missingDataLog = new Map<string, string[]>();

        for (const pair of ammPairs) {
            const { legacyToWrappedMap, pricesMap, decimalsMap } = baseData;

            const canonicalToken0Address = legacyToWrappedMap.get(pair.token0Address) ?? pair.token0Address;
            const canonicalToken1Address = legacyToWrappedMap.get(pair.token1Address) ?? pair.token1Address;

            const price0Usd = pricesMap.get(canonicalToken0Address);
            const price1Usd = pricesMap.get(canonicalToken1Address);
            const decimals0 = decimalsMap.get(canonicalToken0Address);
            const decimals1 = decimalsMap.get(canonicalToken1Address);

            let missingForPair: string[] = [];
            if (!price0Usd) missingForPair.push(`Price for token0 (${canonicalToken0Address})`);
            if (!price1Usd) missingForPair.push(`Price for token1 (${canonicalToken1Address})`);
            if (decimals0 === undefined) missingForPair.push(`Decimals for token0 (${canonicalToken0Address})`);
            if (decimals1 === undefined) missingForPair.push(`Decimals for token1 (${canonicalToken1Address})`);

            let pairTvlUsd = new Decimal(0);
            if (pair.reserve0 && price0Usd && decimals0 !== undefined) {
                pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(pair.reserve0, decimals0).mul(price0Usd));
            }
            if (pair.reserve1 && price1Usd && decimals1 !== undefined) {
                pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(pair.reserve1, decimals1).mul(price1Usd));
            }

            if (pairTvlUsd.isZero()) {
                pairsWithZeroTvl++;
                if (missingForPair.length > 0) {
                    missingDataLog.set(pair.pair, missingForPair);
                }
            }
        }

        console.log('--- Diagnostic Complete ---');
        console.log(`${pairsWithZeroTvl} out of ${ammPairs.length} pairs have a calculated TVL of zero.`);

        if (missingDataLog.size > 0) {
            console.error('Details on pairs with missing data leading to zero TVL:');
            missingDataLog.forEach((reasons, pair) => {
                console.log(`Pair ${pair}:`);
                reasons.forEach(reason => console.log(`  - Missing: ${reason}`));
            });
        }

    } catch (error) {
        console.error('An error occurred during the diagnostic:', error);
    } finally {
        await spikeDB.$disconnect();
    }
}

diagnoseAmmPairs();
