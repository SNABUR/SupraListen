import { PrismaClient } from '@prisma/client';
import { PrismaClient as AmmPrismaClient } from '../../../amm_indexer/prisma/dist/generated/sqlite';
import { NetworkConfig } from '../TaskProcessor';
import { createLogger } from '@/app/indexer/utils';

// Importar los módulos del ciclo de actualización
import { fetchBaseData, fetchAmmSourceData, fetchRecentSwaps } from './update-cycle/data-fetcher';
import { processAmmPairs } from './update-cycle/amm-pair-processor';
import { processStakingPools } from './update-cycle/staking-pool-processor';
import { prepareProtocolStatsUpdate } from './update-cycle/protocol-stats-processor';

const logger = createLogger('update-amm-data-task');

// --- Tarea Principal Orquestadora ---

export async function executeUpdateAmmData(spikeDB: PrismaClient, config: NetworkConfig): Promise<void> {
  logger.info(`[${config.networkName}] Iniciando ciclo de actualización modular...`);

  // Es necesario crear el cliente de la DB externa aquí
  const ammDB = new AmmPrismaClient({
    datasources: { db: { url: `file:../../../amm_indexer/prisma/sqlite/dev.db` } },
  });

  try {
    // 1. OBTENER DATOS
    // ===================
    const baseData = await fetchBaseData(spikeDB, config);
    const sourcePairs = await fetchAmmSourceData(ammDB, config);
    const recentSwaps = await fetchRecentSwaps(ammDB, config.networkName);
    logger.info(`[${config.networkName}] Datos base cargados, ${sourcePairs.length} pares de origen y ${recentSwaps.length} swaps recientes encontrados.`);

    // 2. PROCESAR DATOS Y PREPARAR ACTUALIZACIONES
    // =============================================
    const { ammUpdatePromises, totalAmmTvlUsd } = processAmmPairs(sourcePairs, recentSwaps, baseData, spikeDB);
    logger.info(`[${config.networkName}] ${ammUpdatePromises.length} actualizaciones de pares AMM preparadas.`);

    const { stakingPoolUpdatePromises, totalStakingTvlUsd } = await processStakingPools(spikeDB, config, baseData);
    logger.info(`[${config.networkName}] ${stakingPoolUpdatePromises.length} actualizaciones de pools de staking preparadas.`);

    const protocolStatsPromise = prepareProtocolStatsUpdate(spikeDB, config, totalAmmTvlUsd, totalStakingTvlUsd);
    logger.info(`[${config.networkName}] Actualización de estadísticas del protocolo preparada.`);

    // 3. EJECUTAR TRANSACCIÓN
    // =======================
    const allPromises = [...ammUpdatePromises, ...stakingPoolUpdatePromises, protocolStatsPromise];
    
    if (allPromises.length > 1) {
        logger.info(`[${config.networkName}] Ejecutando ${allPromises.length} operaciones en una transacción...`);
        await spikeDB.$transaction(allPromises);
        logger.info(`[${config.networkName}] Ciclo de actualización modular completado con éxito.`);
    } else {
        logger.warn(`[${config.networkName}] No hay operaciones para ejecutar en la transacción.`);
    }

  } catch (error) {
    logger.error(`[${config.networkName}] Ocurrió un error grave durante el ciclo de actualización modular:`, { error });
  } finally {
    // Siempre nos aseguramos de desconectar el cliente de la DB externa
    await ammDB.$disconnect();
    logger.info(`[${config.networkName}] Cliente de SQLite desconectado.`);
  }
}