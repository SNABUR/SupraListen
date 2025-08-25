
import { PrismaClient as OhlcPrismaClient } from '../prisma/generated/ohlc_db';
import { PrismaClient as MainPrismaClient } from '../prisma/generated/main_db';
import Decimal from 'decimal.js';

const ohlcDB = new OhlcPrismaClient();
const spikeDB = new MainPrismaClient();

async function diagnosePriceLookup() {
    console.log('--- Running Price Lookup Diagnostic ---');

    try {
        // 1. Fetch legacy-to-wrapped mapping and prices from main_db
        console.log('Fetching token data from main_db...');
        const tokens = await spikeDB.tokens.findMany({ where: { network: 'supra-mainnet' } });
        const prices = await spikeDB.token_prices.findMany({ where: { network: 'supra-mainnet' } });

        const legacyToWrappedMap = new Map<string, string>();
        tokens.forEach(t => {
            if (t.originalCoinType) {
                legacyToWrappedMap.set(t.originalCoinType, t.id);
            }
        });

        const pricesMap = new Map<string, Decimal>();
        prices.forEach(tp => {
            if (tp.priceUsd) {
                pricesMap.set(tp.tokenAddress, new Decimal(tp.priceUsd.toString()));
            }
        });

        console.log(`Loaded ${legacyToWrappedMap.size} legacy mappings.`);
        console.log(`Loaded ${pricesMap.size} prices.`);

        // 2. Fetch 1d OHLC data from the last 7 days
        console.log('Fetching 1d OHLC data from ohlc_db...');
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const ohlcRecords = await ohlcDB.ohlcData.findMany({
            where: {
                network: 'supra-mainnet',
                timeframe: '1d',
                ammSource: 'SpikeySwap',
                timestamp: {
                    gte: sevenDaysAgo
                },
            },
        });

        console.log(`Found ${ohlcRecords.length} 1d OHLC records for SpikeySwap in the last 7 days.`);

        // 3. Diagnose lookup
        const missingPrices = new Set<string>();
        let processedRecords = 0;

        for (const ohlc of ohlcRecords) {
            const wrappedToken1 = legacyToWrappedMap.get(ohlc.token1Address) ?? ohlc.token1Address;
            const priceToken1 = pricesMap.get(wrappedToken1);

            if (!priceToken1) {
                missingPrices.add(wrappedToken1);
            }
            processedRecords++;
        }

        console.log(`--- Diagnostic Complete ---`);
        console.log(`Processed ${processedRecords} OHLC records.`);

        if (missingPrices.size > 0) {
            console.error('Found missing prices for the following wrapped token addresses:');
            for (const address of missingPrices) {
                console.log(address);
            }
        } else {
            console.log('All token prices found successfully!');
        }

    } catch (error) {
        console.error('An error occurred during the diagnostic:', error);
    } finally {
        await ohlcDB.$disconnect();
        await spikeDB.$disconnect();
    }
}

diagnosePriceLookup();
