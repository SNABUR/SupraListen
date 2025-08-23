import { PrismaClient } from '../../prisma/generated/main_db';
import ohlcDB from '../../lib/ohlc_prismadb'; // Importar la instancia singleton
import { NetworkConfig } from '../TaskProcessor';
import { createLogger } from '@/app/indexer/utils';

// Importar los módulos del ciclo de actualización
import { fetchBaseData, fetchAmmPairsToProcess, fetch24hVolumeData, fetch7dVolumeData, fetch30dVolumeData } from './update-cycle/data-fetcher';
import { processAmmPairs } from './update-cycle/amm-pair-processor';
import { processStakingPools } from './update-cycle/staking-pool-processor';
import { prepareProtocolStatsUpdate } from './update-cycle/protocol-stats-processor';

const logger = createLogger('update-amm-data-task');

// --- Tarea Principal Orquestadora ---

export async function executeUpdateAmmData(spikeDB: PrismaClient, config: NetworkConfig): Promise<void> {
  logger.info(`[${config.networkName}] Iniciando ciclo de actualización modular...`);

  try {
    // 1. OBTENER DATOS
    const baseData = await fetchBaseData(spikeDB, config);
    const ammPairs = await fetchAmmPairsToProcess(spikeDB, config);
    const volumes24h = await fetch24hVolumeData(ohlcDB, config, baseData.pricesMap, baseData.legacyToWrappedMap);
    const volumes7d = await fetch7dVolumeData(ohlcDB, config, baseData.pricesMap, baseData.legacyToWrappedMap);
    const volumes30d = await fetch30dVolumeData(ohlcDB, config, baseData.pricesMap, baseData.legacyToWrappedMap);
    logger.info(`[${config.networkName}] Datos base cargados, ${ammPairs.length} pares con reservas encontrados para procesar.`);

    // 2. PROCESAR DATOS Y PREPARAR ACTUALIZACIONES
    const { ammUpdatePromises, totalAmmTvlUsd } = processAmmPairs(ammPairs, volumes24h, volumes7d, volumes30d, baseData, spikeDB);
    logger.info(`[${config.networkName}] ${ammUpdatePromises.length} actualizaciones de pares AMM preparadas.`);

    const { stakingPoolUpdatePromises, totalStakingTvlUsd } = await processStakingPools(spikeDB, config, baseData);
    logger.info(`[${config.networkName}] ${stakingPoolUpdatePromises.length} actualizaciones de pools de staking preparadas.`);

    const protocolStatsPromise = prepareProtocolStatsUpdate(spikeDB, config, totalAmmTvlUsd, totalStakingTvlUsd);
    logger.info(`[${config.networkName}] Actualización de estadísticas del protocolo preparada.`);

    // 3. EJECUTAR TRANSACCIÓN
    const allPromises = [...ammUpdatePromises, ...stakingPoolUpdatePromises, protocolStatsPromise];
    
    if (allPromises.length > 0) {
        logger.info(`[${config.networkName}] Ejecutando ${allPromises.length} operaciones en una transacción...`);
        await spikeDB.$transaction(allPromises);
        logger.info(`[${config.networkName}] Ciclo de actualización modular completado con éxito.`);
    } else {
        logger.warn(`[${config.networkName}] No hay operaciones para ejecutar en la transacción.`);
    }

  } catch (error) {
    logger.error(`[${config.networkName}] Ocurrió un error grave durante el ciclo de actualización modular:`, { error });
  }
}
