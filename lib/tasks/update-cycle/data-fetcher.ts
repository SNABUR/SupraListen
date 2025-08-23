import { Ammpair, PrismaClient as MainPrismaClient } from '../../../prisma/generated/main_db';
import { PrismaClient as OhlcPrismaClient } from '../../../prisma/generated/ohlc_db';
import { NetworkConfig } from '../../TaskProcessor';
import { getSwapFee } from '../../functions/getSwapFee';
import Decimal from 'decimal.js';

// --- Tipos de Datos Exportados ---

// El tipo para el mapa de volúmenes
export type VolumeMap = Map<string, Decimal>;

export interface BaseData {
    pricesMap: Map<string, Decimal>;
    decimalsMap: Map<string, number>;
    swapFeeBps: string | null;
    legacyToWrappedMap: Map<string, string>;
}

// --- Funciones de Obtención de Datos ---

/**
 * Obtiene datos base (precios, decimales, mapeos de legacy) desde la DB principal (Supabase).
 */
export async function fetchBaseData(spikeDB: MainPrismaClient, config: NetworkConfig): Promise<BaseData> {
    const tokens = await spikeDB.tokens.findMany({ where: { network: config.networkName } });
    const prices = await spikeDB.token_prices.findMany({ where: { network: config.networkName } });
    const swapFeeResult = await getSwapFee(config);

    const decimalsMap = new Map<string, number>();
    const legacyToWrappedMap = new Map<string, string>();

    tokens.forEach(t => {
        if (t.decimals !== null) decimalsMap.set(t.id, t.decimals);
        // Si el token tiene un originalCoinType, es una moneda legacy. Mapeamos su dirección legacy a su ID (que es la dirección wrapped).
        if (t.originalCoinType) {
            legacyToWrappedMap.set(t.originalCoinType, t.id);
        }
    });

    const pricesMap = new Map<string, Decimal>();
    prices.forEach(tp => { if (tp.priceUsd) pricesMap.set(tp.tokenAddress, new Decimal(tp.priceUsd.toString())); });

    return {
        pricesMap,
        decimalsMap,
        swapFeeBps: swapFeeResult ? swapFeeResult[0] : null,
        legacyToWrappedMap,
    };
}

/**
 * Obtiene los pares AMM y sus reservas directamente desde la DB principal.
 * Esta es ahora la fuente de verdad para los pares a procesar.
 */
export async function fetchAmmPairsToProcess(spikeDB: MainPrismaClient, config: NetworkConfig): Promise<Ammpair[]> {
    return await spikeDB.ammpair.findMany({
        where: {
            network: config.networkName,
            reserve0: { not: null },
            reserve1: { not: null },
        },
    });
}

/**
 * Obtiene el volumen de las últimas 24 horas para cada par desde la DB de OHLC.
 * Utiliza el timeframe '1d' pre-agregado y lo convierte a USD.
 */
export async function fetch24hVolumeData(ohlcDB: OhlcPrismaClient, config: NetworkConfig, pricesMap: Map<string, Decimal>, legacyToWrappedMap: Map<string, string>): Promise<VolumeMap> {
    const latestTimestampResult = await ohlcDB.ohlcData.findFirst({
        where: {
            network: config.networkName,
            timeframe: '1d',
            ammSource: 'SpikeySwap',
        },
        orderBy: {
            timestamp: 'desc',
        },
        select: {
            timestamp: true,
        }
    });

    const volumeMap: VolumeMap = new Map();
    if (!latestTimestampResult) {
        return volumeMap;
    }

    const result = await ohlcDB.ohlcData.findMany({
        where: {
            network: config.networkName,
            timeframe: '1d',
            ammSource: 'SpikeySwap',
            timestamp: latestTimestampResult.timestamp,
        },
    });

    for (const ohlc of result) {
        const wrappedToken0 = legacyToWrappedMap.get(ohlc.token0Address) ?? ohlc.token0Address;
        const wrappedToken1 = legacyToWrappedMap.get(ohlc.token1Address) ?? ohlc.token1Address;
        const key = [wrappedToken0, wrappedToken1].sort().join('-').toLowerCase();

        const volumeToken1 = ohlc.volume ?? new Decimal(0);
        const priceToken1 = pricesMap.get(wrappedToken1);

        const volumeUsd = priceToken1 ? volumeToken1.mul(priceToken1) : new Decimal(0);
        
        volumeMap.set(key, volumeUsd);
    }

    return volumeMap;
}

/**
 * Obtiene el volumen de los últimos 7 días para cada par desde la DB de OHLC.
 * Suma los volúmenes de los últimos 7 registros con timeframe '1d' y los convierte a USD.
 */
export async function fetch7dVolumeData(ohlcDB: OhlcPrismaClient, config: NetworkConfig, pricesMap: Map<string, Decimal>, legacyToWrappedMap: Map<string, string>): Promise<VolumeMap> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await ohlcDB.ohlcData.groupBy({
        by: ['token0Address', 'token1Address'],
        where: {
            network: config.networkName,
            timeframe: '1d',
            ammSource: 'SpikeySwap',
            timestamp: { 
                gte: sevenDaysAgo 
            },
        },
        _sum: {
            volume: true,
        },
    });

    const volumeMap: VolumeMap = new Map();
    for (const group of result) {
        const wrappedToken0 = legacyToWrappedMap.get(group.token0Address) ?? group.token0Address;
        const wrappedToken1 = legacyToWrappedMap.get(group.token1Address) ?? group.token1Address;
        const key = [wrappedToken0, wrappedToken1].sort().join('-').toLowerCase();

        const totalVolumeToken1 = group._sum.volume ?? new Decimal(0);
        const priceToken1 = pricesMap.get(wrappedToken1);

        const volumeUsd = priceToken1 ? totalVolumeToken1.mul(priceToken1) : new Decimal(0);

        volumeMap.set(key, volumeUsd);
    }

    return volumeMap;
}

/**
 * Obtiene el volumen de los últimos 30 días para cada par desde la DB de OHLC.
 * Suma los volúmenes de los últimos 30 registros con timeframe '1d' y los convierte a USD.
 */
export async function fetch30dVolumeData(ohlcDB: OhlcPrismaClient, config: NetworkConfig, pricesMap: Map<string, Decimal>, legacyToWrappedMap: Map<string, string>): Promise<VolumeMap> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const result = await ohlcDB.ohlcData.groupBy({
        by: ['token0Address', 'token1Address'],
        where: {
            network: config.networkName,
            timeframe: '1d',
            ammSource: 'SpikeySwap',
            timestamp: { 
                gte: thirtyDaysAgo 
            },
        },
        _sum: {
            volume: true,
        },
    });

    const volumeMap: VolumeMap = new Map();
    for (const group of result) {
        const wrappedToken0 = legacyToWrappedMap.get(group.token0Address) ?? group.token0Address;
        const wrappedToken1 = legacyToWrappedMap.get(group.token1Address) ?? group.token1Address;
        const key = [wrappedToken0, wrappedToken1].sort().join('-').toLowerCase();

        const totalVolumeToken1 = group._sum.volume ?? new Decimal(0);
        const priceToken1 = pricesMap.get(wrappedToken1);

        const volumeUsd = priceToken1 ? totalVolumeToken1.mul(priceToken1) : new Decimal(0);

        volumeMap.set(key, volumeUsd);
    }

    return volumeMap;
}
