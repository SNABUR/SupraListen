import { PrismaClient } from '@prisma/client';
import Decimal from 'decimal.js';
import { BaseData, FullSpikeyAmmSwap } from './data-fetcher';
import { toDisplayAmount } from './utils';

// Tipo para los datos de origen de los pares AMM (lo que viene de SQLite)
type AmmSourceData = {
    id: number;
    network: string;
    spikeyAmmPairAddress: string | null;
    spikeyAmmReserve0: bigint | null;
    spikeyAmmReserve1: bigint | null;
    token0: { address: string };
    token1: { address: string };
};

/**
 * Calcula el APR de 24h para un par basándose en las comisiones generadas.
 */
function calculate24hApr(pairTvlUsd: Decimal, swaps: FullSpikeyAmmSwap[], baseData: BaseData): string | null {
    if (pairTvlUsd.isZero() || !baseData.swapFeeBps) {
        return null;
    }

    const swapFee = new Decimal(baseData.swapFeeBps).div(10000); // Convertir de BPS a decimal
    let totalFeesUsd24h = new Decimal(0);

    for (const swap of swaps) {
        // Asegurarse de que el swap tiene la información necesaria
        if (!swap.pair || !swap.pair.token0 || !swap.pair.token1) continue;

        const feeToken0 = toDisplayAmount(swap.amount0In, baseData.decimalsMap.get(swap.pair.token0.address));
        const feeToken1 = toDisplayAmount(swap.amount1In, baseData.decimalsMap.get(swap.pair.token1.address));

        const priceToken0 = baseData.pricesMap.get(swap.pair.token0.address);
        const priceToken1 = baseData.pricesMap.get(swap.pair.token1.address);

        if (priceToken0) {
            totalFeesUsd24h = totalFeesUsd24h.plus(feeToken0.mul(swapFee).mul(priceToken0));
        }
        if (priceToken1) {
            totalFeesUsd24h = totalFeesUsd24h.plus(feeToken1.mul(swapFee).mul(priceToken1));
        }
    }

    if (totalFeesUsd24h.isZero()) {
        return '0.00';
    }

    const dailyApr = totalFeesUsd24h.div(pairTvlUsd);
    const yearlyApr = dailyApr.mul(365).mul(100); // Anualizado y en porcentaje

    return yearlyApr.toFixed(2);
}


export function processAmmPairs(sourcePairs: AmmSourceData[], recentSwaps: FullSpikeyAmmSwap[], baseData: BaseData, spikeDB: PrismaClient) {
    let totalAmmTvlUsd = new Decimal(0);
    const ammUpdatePromises = [];

    // Agrupar swaps por pairId para una búsqueda eficiente
    const swapsByPairId = new Map<number, FullSpikeyAmmSwap[]>();
    for (const swap of recentSwaps) {
        if (!swapsByPairId.has(swap.pairId)) {
            swapsByPairId.set(swap.pairId, []);
        }
        swapsByPairId.get(swap.pairId)!.push(swap);
    }

    for (const sourcePair of sourcePairs) {
        if (!sourcePair.spikeyAmmPairAddress) continue;

        const { address: token0Address } = sourcePair.token0;
        const { address: token1Address } = sourcePair.token1;
        const price0Usd = baseData.pricesMap.get(token0Address);
        const price1Usd = baseData.pricesMap.get(token1Address);
        const decimals0 = baseData.decimalsMap.get(token0Address);
        const decimals1 = baseData.decimalsMap.get(token1Address);
        let pairTvlUsd = new Decimal(0);

        if (sourcePair.spikeyAmmReserve0 && price0Usd && decimals0 !== undefined) {
            pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(sourcePair.spikeyAmmReserve0, decimals0).mul(price0Usd));
        }
        if (sourcePair.spikeyAmmReserve1 && price1Usd && decimals1 !== undefined) {
            pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(sourcePair.spikeyAmmReserve1, decimals1).mul(price1Usd));
        }

        totalAmmTvlUsd = totalAmmTvlUsd.plus(pairTvlUsd);

        // Calcular el APR de 24h
        const swapsForPair = swapsByPairId.get(sourcePair.id) || [];
        const apr24h = calculate24hApr(pairTvlUsd, swapsForPair, baseData);

        const updateData: any = {
            reserve0: sourcePair.spikeyAmmReserve0?.toString(),
            reserve1: sourcePair.spikeyAmmReserve1?.toString(),
            tvlUsd: pairTvlUsd.toFixed(6),
            lastStatsUpdate: new Date(),
            apr24h: apr24h,
        };

        if (baseData.swapFeeBps !== null) {
            updateData.lpFeePercent = baseData.swapFeeBps;
        }

        ammUpdatePromises.push(
            spikeDB.ammpair.update({
                where: { network_pair: { network: sourcePair.network, pair: sourcePair.spikeyAmmPairAddress } },
                data: updateData,
            })
        );
    }

    return {
        ammUpdatePromises,
        totalAmmTvlUsd,
    };
}