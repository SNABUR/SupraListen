import { PrismaClient } from '@prisma/client';
import { Prisma, PrismaClient as AmmPrismaClient } from '../../../../amm_indexer/prisma/dist/generated/sqlite';
import { NetworkConfig } from '../../TaskProcessor';
import { getSwapFee } from '../../functions/getSwapFee';
import Decimal from 'decimal.js';

// --- Tipos y Validadores de Prisma ---

// Creamos un "validador" de Prisma que describe nuestra consulta de swaps con sus relaciones
const swapWithDetailsValidator = Prisma.validator<Prisma.SpikeyAmmSwapFindManyArgs>()({
    include: {
        pair: {
            include: {
                token0: true,
                token1: true,
            },
        },
    },
});

// Exportamos un tipo 100% correcto para un swap que incluye sus relaciones
export type FullSpikeyAmmSwap = Prisma.SpikeyAmmSwapGetPayload<typeof swapWithDetailsValidator>;

// --- Interfaces de Datos ---

export interface BaseData {
    pricesMap: Map<string, Decimal>;
    decimalsMap: Map<string, number>;
    swapFeeBps: string | null;
}


// --- Funciones de Obtención de Datos ---

/**
 * Obtiene datos base (precios, decimales, comisiones) desde la DB principal (Supabase).
 */
export async function fetchBaseData(spikeDB: PrismaClient, config: NetworkConfig): Promise<BaseData> {
    const tokens = await spikeDB.tokens.findMany({ where: { network: config.networkName } });
    const prices = await spikeDB.token_prices.findMany({ where: { network: config.networkName } });
    const swapFeeResult = await getSwapFee(config);

    const decimalsMap = new Map<string, number>();
    tokens.forEach(t => { if (t.decimals !== null) decimalsMap.set(t.id, t.decimals); });

    const pricesMap = new Map<string, Decimal>();
    prices.forEach(tp => { if (tp.priceUsd) pricesMap.set(tp.tokenAddress, new Decimal(tp.priceUsd.toString())); });

    return {
        pricesMap,
        decimalsMap,
        swapFeeBps: swapFeeResult ? swapFeeResult[0] : null,
    };
}

/**
 * Obtiene los datos de origen de los pares AMM desde la base de datos de SQLite.
 */
export async function fetchAmmSourceData(ammDB: AmmPrismaClient, config: NetworkConfig) {
    return await ammDB.pair.findMany({
        where: {
            network: config.networkName,
            spikeyAmmReserve0: { not: null },
            spikeyAmmReserve1: { not: null },
            spikeyAmmPairAddress: { not: null },
        },
        include: { token0: true, token1: true },
    });
}

/**
 * Obtiene todos los swaps de las últimas 24 horas desde la DB de SQLite.
 */
export async function fetchRecentSwaps(ammDB: AmmPrismaClient, network: string): Promise<FullSpikeyAmmSwap[]> {
    const twentyFourHoursAgo = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));

    const findArgs = {
        where: {
            network: network,
            blockTimestamp: {
                gte: twentyFourHoursAgo,
            },
        },
        ...swapWithDetailsValidator, // Usamos el validador para aplicar el `include`
    };

    return await ammDB.spikeyAmmSwap.findMany(findArgs);
}