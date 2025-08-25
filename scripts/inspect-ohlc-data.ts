
import { PrismaClient as OhlcPrismaClient } from '../prisma/generated/ohlc_db';

const ohlcDB = new OhlcPrismaClient();

async function inspectOhlcData() {

    console.log('--- Inspecting OHLC Data for SpikeySwap ---');

    try {

        const latestRecord = await ohlcDB.ohlcData.findFirst({
            where: {
                ammSource: 'SpikeySwap',
            },
            orderBy: {
                timestamp: 'desc',
            },
        });

        console.log('Latest OHLC record (any timeframe, SpikeySwap):', latestRecord);

        const latest_1d_Record = await ohlcDB.ohlcData.findFirst({
            where: {
                timeframe: '1d',
                ammSource: 'SpikeySwap',
            },
            orderBy: {
                timestamp: 'desc',
            },
        });

        console.log('Latest OHLC record (1d timeframe, SpikeySwap):', latest_1d_Record);


        const sevenDaysAgo = new Date();

        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentRecordsCount = await ohlcDB.ohlcData.count({

            where: {
                ammSource: 'SpikeySwap',
                timestamp: {

                    gte: sevenDaysAgo,

                },

            },

        });

        console.log(`Found ${recentRecordsCount} records in the last 7 days (any timeframe, SpikeySwap).`);

        const recent_1d_RecordsCount = await ohlcDB.ohlcData.count({

            where: {
                timeframe: '1d',
                ammSource: 'SpikeySwap',
                timestamp: {

                    gte: sevenDaysAgo,

                },

            },

        });

        console.log(`Found ${recent_1d_RecordsCount} records in the last 7 days (1d timeframe, SpikeySwap).`);


        const sampleRecords = await ohlcDB.ohlcData.findMany({
            where: {
                ammSource: 'SpikeySwap',
            },
            take: 5,

            orderBy: {

                timestamp: 'desc',

            },

        });

        console.log('Sample OHLC records (any timeframe, SpikeySwap):', sampleRecords);


        const sample_1d_Records = await ohlcDB.ohlcData.findMany({
            where: {
                timeframe: '1d',
                ammSource: 'SpikeySwap',
            },
            take: 5,

            orderBy: {

                timestamp: 'desc',

            },

        });

        console.log('Sample OHLC records (1d timeframe, SpikeySwap):', sample_1d_Records);


    } catch (error) {

        console.error('Error inspecting OHLC data:', error);

    } finally {

        await ohlcDB.$disconnect();

    }

}

inspectOhlcData();

