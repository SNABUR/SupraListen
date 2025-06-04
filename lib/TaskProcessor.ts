// src/lib/TaskProcessor.ts
import { createLogger } from '../app/indexer/utils';
import cron, { ScheduledTask } from 'node-cron';
import { executeGetReservesForAllPairs } from './tasks/executeGetReserves';
import { executeGetTotalStakedForAllPools } from './tasks/executeGetTotalStaked';
import { executeUpdateAmmData } from './tasks/executeUpdateAmmData';
import prismadb from '@/lib/prismadb';

const logger = createLogger('scheduled-tasks');

export interface NetworkConfig {
  rpcUrl: string;
  chainId: string;
  networkName: string;
}

interface SchedulerSetupConfig {
  testnet?: NetworkConfig;
  mainnet?: NetworkConfig;
}

let activeJobs: Map<string, ScheduledTask> = new Map();

const DELAY_BETWEEN_SUB_TASKS_MS = 10000; // 10 segundos de delay entre sub-tareas

// Función helper para introducir delays
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Orquesta la ejecución secuencial de todas las tareas de actualización para una red.
 */
async function runUpdateCycleForNetwork(networkConfig: NetworkConfig) {
  logger.info(`Starting update cycle for ${networkConfig.networkName}...`);

  try {
    logger.info(`[${networkConfig.networkName}] Executing GetReservesForAllPairs...`);
    await executeGetReservesForAllPairs(prismadb, networkConfig);
    logger.info(`[${networkConfig.networkName}] GetReservesForAllPairs COMPLETED.`);

    await delay(DELAY_BETWEEN_SUB_TASKS_MS); // Espera 10 segundos

    logger.info(`[${networkConfig.networkName}] Executing GetTotalStakedForAllPools...`);
    await executeGetTotalStakedForAllPools(prismadb, networkConfig);
    logger.info(`[${networkConfig.networkName}] GetTotalStakedForAllPools COMPLETED.`);

    await delay(DELAY_BETWEEN_SUB_TASKS_MS); // Espera 10 segundos

    logger.info(`[${networkConfig.networkName}] Executing UpdateAmmData (TVL calculations)...`);
    await executeUpdateAmmData(prismadb, networkConfig); // Esta ya calcula TVL y actualiza ProtocolStats
    logger.info(`[${networkConfig.networkName}] UpdateAmmData COMPLETED.`);

    logger.info(`Update cycle for ${networkConfig.networkName} FINISHED successfully.`);

  } catch (error) {
    logger.error(`Error during update cycle for ${networkConfig.networkName}:`, error);
    // Aquí podrías añadir notificaciones o reintentos si es necesario
  }
}

export function startScheduledTasks(setupConfig: SchedulerSetupConfig): void {
  if (activeJobs.size > 0) {
    logger.info('Scheduled tasks might already be initialized. Check activeJobs map if issues.');
  }

  logger.info('Initializing/Updating scheduled tasks...');

  const networksToProcess: NetworkConfig[] = [];
  if (setupConfig.testnet) {
    networksToProcess.push(setupConfig.testnet);
  }
  if (setupConfig.mainnet) {
    networksToProcess.push(setupConfig.mainnet);
  }

  if (networksToProcess.length === 0) {
    logger.warn('No network configurations provided. No tasks will be started.');
    return;
  }

  networksToProcess.forEach(networkConfig => {
    const masterUpdateTaskKey = `${networkConfig.networkName}-MasterUpdateCycle`;

    if (!activeJobs.has(masterUpdateTaskKey)) {
      logger.info(`Setting up Master Update Cycle task for ${networkConfig.networkName}`);

      // Configura esta tarea para que se ejecute cada 30 minutos (o la frecuencia deseada)
      // Ejemplo: '*/30 * * * *' (cada 30 minutos: a :00 y :30 de cada hora)
      // Ejemplo: '0 * * * *' (cada hora, al inicio de la hora)
      const schedule = '0 * * * *'; // <--- AJUSTA ESTE SCHEDULE A TU NECESIDAD

      const job: ScheduledTask = cron.schedule(schedule, async () => {
        logger.info(`Triggering Master Update Cycle for ${networkConfig.networkName} (cron: ${schedule})`);
        // Llamamos a la función que orquesta todas las sub-tareas secuencialmente
        await runUpdateCycleForNetwork(networkConfig);
      }, { timezone: "UTC" });

      activeJobs.set(masterUpdateTaskKey, job);
      logger.info(`Master Update Cycle task for ${networkConfig.networkName} scheduled with cron: ${schedule}.`);
    } else {
      logger.info(`Master Update Cycle task for ${networkConfig.networkName} is already scheduled.`);
    }
  });

  if (activeJobs.size > 0) {
    logger.info(`${activeJobs.size} task(s) configured and started/verified with node-cron.`);
  } else {
    logger.warn('No scheduled tasks were ultimately configured.');
  }
}

export function stopScheduledTasks(): void {
  if (activeJobs.size === 0) {
    return;
  }
  logger.info(`Stopping ${activeJobs.size} scheduled task(s)...`);
  activeJobs.forEach((job, taskKey) => {
    job.stop();
    logger.info(`Task ${taskKey} stopped.`);
  });
  activeJobs.clear();
  logger.info('All scheduled tasks stopped.');
}