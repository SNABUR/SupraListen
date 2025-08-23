import { Ammpair, PrismaClient as MainPrismaClient } from '../../../prisma/generated/main_db';
import Decimal from 'decimal.js';
import { BaseData, VolumeMap } from './data-fetcher';
import { toDisplayAmount } from './utils';

/**
 * Calcula el APR de 24h para un par basándose en el volumen y las comisiones.
 */
function calculate24hApr(pairTvlUsd: Decimal, volume24h: Decimal, baseData: BaseData): string | null {
    if (pairTvlUsd.isZero() || !baseData.swapFeeBps) {
        return null;
    }

    const swapFee = new Decimal(baseData.swapFeeBps).div(10000); // Convertir de BPS a decimal
    const totalFeesUsd24h = volume24h.mul(swapFee);

    if (totalFeesUsd24h.isZero()) {
        return '0.00';
    }

    const dailyApr = totalFeesUsd24h.div(pairTvlUsd);
    const yearlyApr = dailyApr.mul(365).mul(100); // Anualizado y en porcentaje

    return yearlyApr.toFixed(2);
}

/**
 * Calcula el APR de 7d para un par basándose en el volumen y las comisiones.
 */
function calculate7dApr(pairTvlUsd: Decimal, volume7d: Decimal, baseData: BaseData): string | null {
    if (pairTvlUsd.isZero() || !baseData.swapFeeBps) {
        return null;
    }

    const swapFee = new Decimal(baseData.swapFeeBps).div(10000); // Convertir de BPS a decimal
    const totalFeesUsd7d = volume7d.mul(swapFee);

    if (totalFeesUsd7d.isZero()) {
        return '0.00';
    }

    // Calcular la media diaria de comisiones y luego el APR diario
    const averageDailyFees = totalFeesUsd7d.div(7);
    const dailyApr = averageDailyFees.div(pairTvlUsd);
    const yearlyApr = dailyApr.mul(365).mul(100); // Anualizado y en porcentaje

    return yearlyApr.toFixed(2);
}

/**
 * Calcula el APY basándose en un APR, asumiendo una capitalización diaria.
 */
function calculateApy(apr: string | null): string | null {
    if (!apr) {
        return null;
    }
    const aprDecimal = new Decimal(apr).div(100); // Convertir de porcentaje a decimal
    if (aprDecimal.isZero()) {
        return '0.00';
    }
    // APY = (1 + r/n)^n - 1, donde r es la tasa anual (APR) y n es el número de períodos de capitalización.
    // Asumimos capitalización diaria (n=365).
    const n = 365;
    const apy = new Decimal(1).plus(aprDecimal.div(n)).pow(n).minus(1).mul(100);

    return apy.toFixed(2);
}


export function processAmmPairs(ammPairs: Ammpair[], volumes24h: VolumeMap, volumes7d: VolumeMap, volumes30d: VolumeMap, baseData: BaseData, spikeDB: MainPrismaClient) {
    let totalAmmTvlUsd = new Decimal(0);
    const ammUpdatePromises = [];

    for (const pair of ammPairs) {
        if (!pair.pair) continue;

        const { legacyToWrappedMap, pricesMap, decimalsMap } = baseData;

        // Obtener direcciones CANÓNICAS (wrapped) para todas las operaciones
        const canonicalToken0Address = legacyToWrappedMap.get(pair.token0Address) ?? pair.token0Address;
        const canonicalToken1Address = legacyToWrappedMap.get(pair.token1Address) ?? pair.token1Address;

        // Usar direcciones canónicas para buscar precios y decimales
        const price0Usd = pricesMap.get(canonicalToken0Address);
        const price1Usd = pricesMap.get(canonicalToken1Address);
        const decimals0 = decimalsMap.get(canonicalToken0Address);
        const decimals1 = decimalsMap.get(canonicalToken1Address);
        
        let pairTvlUsd = new Decimal(0);

        if (pair.reserve0 && price0Usd && decimals0 !== undefined) {
            pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(pair.reserve0, decimals0).mul(price0Usd));
        }
        if (pair.reserve1 && price1Usd && decimals1 !== undefined) {
            pairTvlUsd = pairTvlUsd.plus(toDisplayAmount(pair.reserve1, decimals1).mul(price1Usd));
        }

        totalAmmTvlUsd = totalAmmTvlUsd.plus(pairTvlUsd);

        // Crear la clave canónica y ordenada para buscar el volumen
        const volumeKey = [canonicalToken0Address, canonicalToken1Address].sort().join('-').toLowerCase();
        
        const volume24h = volumes24h.get(volumeKey) ?? new Decimal(0);
        const volume7d = volumes7d.get(volumeKey) ?? new Decimal(0);
        const volume30d = volumes30d.get(volumeKey) ?? new Decimal(0);

        const apr24h = calculate24hApr(pairTvlUsd, volume24h, baseData);
        const apr7d = calculate7dApr(pairTvlUsd, volume7d, baseData);
        const apyCalculated = calculateApy(apr24h);

        const swapFee = baseData.swapFeeBps ? new Decimal(baseData.swapFeeBps).div(10000) : new Decimal(0);
        const feesUsd24h = volume24h.mul(swapFee);
        const feesUsd7d = volume7d.mul(swapFee);
        const feesUsd30d = volume30d.mul(swapFee);

        // No actualizamos reserve0 y reserve1 porque son nuestra fuente de verdad.
        // Solo actualizamos los campos calculados.
        const updateData: any = {
            tvlUsd: pairTvlUsd.toFixed(6),
            lastStatsUpdate: new Date(),
            apr24h: apr24h,
            volumeUsd24h: volume24h.toFixed(6),
            apr7d: apr7d,
            volumeUsd7d: volume7d.toFixed(6),
            volumeUsd30d: volume30d.toFixed(6),
            apyCalculated: apyCalculated,
            feesUsd24h: feesUsd24h.toFixed(6),
            feesUsd7d: feesUsd7d.toFixed(6),
            feesUsd30d: feesUsd30d.toFixed(6),
        };

        if (baseData.swapFeeBps !== null) {
            updateData.lpFeePercent = baseData.swapFeeBps;
        }

        ammUpdatePromises.push(
            spikeDB.ammpair.update({
                where: { network_pair: { network: pair.network, pair: pair.pair } },
                data: updateData,
            })
        );
    }

    return {
        ammUpdatePromises,
        totalAmmTvlUsd,
    };
}
