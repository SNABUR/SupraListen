// D:\Crystara\lib\tasks\executeProcessOHLC.ts
import { PrismaClient } from '../../prisma/generated/main_db';
import { Decimal } from '../../prisma/generated/main_db/runtime/library';
import { createLogger } from '../../app/indexer/utils';
import { NetworkConfig } from '../TaskProcessor';
import { signalDB } from '../signalDB'; // Re-importamos el gestor de señales

const logger = createLogger('executeProcessOHLC');

// Agrupa los trades por intervalo de tiempo (ej. 1 minuto)
function groupTradesByInterval(trades: any[], intervalMinutes = 1) {
    const groups = new Map<string, any[]>();
    const intervalSeconds = BigInt(intervalMinutes * 60);

    trades.forEach(trade => {
        const tradeTimestamp = BigInt(trade.timestamp);
        const intervalStartTimestamp = tradeTimestamp - (tradeTimestamp % intervalSeconds);

        const key = `${trade.tokenAddress}-${intervalStartTimestamp.toString()}`;

        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key)?.push(trade);
    });

    return groups;
}

export async function executeProcessOHLC(prismadb: PrismaClient, networkConfig: NetworkConfig) {
    // 1. Comprobar la señal (modo de operación normal y eficiente)
    if (!signalDB.hasSignal(networkConfig.networkName)) { // Usamos hasSignal y pasamos la red
        return; // No hacer nada si no hay nuevos trades
    }
    
    logger.info(`[${networkConfig.networkName}] Activity signal found. Starting OHLC processing...`);

    try {
        // 2. Buscar todos los trades no procesados para la red correspondiente
        const unprocessedTrades = await prismadb.tradeEvent.findMany({
            where: {
                network: networkConfig.networkName, // Filtro de red reactivado
                processedForOHLC: false,
            },
            orderBy: {
                timestamp: 'asc'
            }
        });

        if (unprocessedTrades.length === 0) {
            logger.info(`[${networkConfig.networkName}] Signal found, but no new trades in DB yet.`);
            // No borramos la señal aquí, se borrará solo si se procesan trades
            return;
        }

        logger.info(`[${networkConfig.networkName}] Found ${unprocessedTrades.length} new trades to process.`);

        // 3. Agrupar y procesar
        const tradesGrouped = groupTradesByInterval(unprocessedTrades);

        // Obtener mapa de decimales
        const pools = await prismadb.poolsDB.findMany({
            select: { tokenAddress: true, tokenDecimals: true },
        });
        const decimalsMap = new Map<string, number>();
        for (const pool of pools) {
            decimalsMap.set(pool.tokenAddress, pool.tokenDecimals);
        }

        for (const [key, trades] of tradesGrouped.entries()) {
            if (trades.length === 0) continue;

            const [tokenAddress, timestampStr] = key.split('-');
            const intervalTimestamp = BigInt(timestampStr);
            const granularity = '1m';

            // Lógica de cálculo de precio corregida
            const prices = trades.map(t => {
                const tokenDecimals = decimalsMap.get(t.tokenAddress);
                const supraDecimals = 8; // Estándar para Move

                if (tokenDecimals === undefined) return null;

                const supraAmount = new Decimal(t.supraAmount.toString());
                const tokenAmount = new Decimal(t.tokenAmount.toString());

                if (tokenAmount.isZero()) return null;

                const adjustedSupra = supraAmount.div(new Decimal(10).pow(supraDecimals));
                const adjustedToken = tokenAmount.div(new Decimal(10).pow(tokenDecimals));

                if (adjustedToken.isZero()) return null;

                return adjustedSupra.div(adjustedToken);
            }).filter((p): p is Decimal => p !== null);

            if (prices.length === 0) continue;

            const open = prices[0];
            const close = prices[prices.length - 1];
            const high = Decimal.max(...prices);
            const low = Decimal.min(...prices);
            const volumeInSupra = trades.reduce((sum, t) => sum + BigInt(t.supraAmount), 0n);
            const volume = new Decimal(volumeInSupra.toString()).div(new Decimal(10).pow(8)); // Ajuste de volumen

            // 4. Escribir en la DB con el tipo de dato correcto (Decimal)
            await prismadb.token_price_history.upsert({
                where: {
                    network_tokenAddress_timestamp_granularity: {
                        network: networkConfig.networkName,
                        tokenAddress: tokenAddress,
                        timestamp: intervalTimestamp,
                        granularity: granularity
                    }
                },
                update: {
                    high: high,
                    low: low,
                    close: close,
                    volume: volume,
                },
                create: {
                    network: networkConfig.networkName,
                    tokenAddress: tokenAddress,
                    timestamp: intervalTimestamp,
                    granularity: granularity,
                    open: open,
                    high: high,
                    low: low,
                    close: close,
                    volume: volume,
                }
            });
        }

        // 5. Marcar como procesados
        const tradeIds = unprocessedTrades.map(t => t.id);
        await prismadb.tradeEvent.updateMany({
            where: { id: { in: tradeIds } },
            data: { processedForOHLC: true }
        });

        logger.info(`[${networkConfig.networkName}] Successfully processed ${unprocessedTrades.length} trades and updated OHLC data.`);

        // 6. Borrar la señal SOLO si se procesaron trades con éxito
        signalDB.clear(networkConfig.networkName); // Borramos la señal para esta red

    } catch (error) {
        logger.error(`[${networkConfig.networkName}] Error during OHLC processing:`, error);
    }
}