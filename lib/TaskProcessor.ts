// src/lib/TaskProcessor.ts
import { createLogger } from '../app/indexer/utils';
import cron, { ScheduledTask } from 'node-cron';
import { executeGetReservesForAllPairs } from './tasks/executeGetReserves'; // Para AMM
import { executeGetTotalStakedForAllPools } from './tasks/executeGetTotalStaked'; // Para StakingPools
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

// Usaremos claves más descriptivas para los activeJobs si tenemos múltiples tipos de tareas por red
// Ejemplo: 'Testnet-AMMReserves', 'Testnet-StakingTotal'
let activeJobs: Map<string, ScheduledTask> = new Map();

export function startScheduledTasks(setupConfig: SchedulerSetupConfig): void {
  if (activeJobs.size > 0) { // Esta condición podría necesitar ser más granular si reinicias tareas individuales
    logger.info('Scheduled tasks might already be initialized. Check activeJobs map if issues.');
    // return; // Comentado para permitir la adición de nuevas tareas si el procesador ya está "iniciado"
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
    const ammTaskKey = `${networkConfig.networkName}-AMMReserves`;
    const stakingTaskKey = `${networkConfig.networkName}-StakingTotal`;

    // Tarea para AMM Reserves
    if (!activeJobs.has(ammTaskKey)) {
      logger.info(`Setting up AMM reserve update task for ${networkConfig.networkName}`);
      const ammJob: ScheduledTask = cron.schedule('*/60 * * * *', async () => { // Cada 1 minuto
        logger.info(`Triggering AMM reserve update task for ${networkConfig.networkName} (cron)`);
        await executeGetReservesForAllPairs(prismadb, networkConfig);
      }, { timezone: "UTC" });
      activeJobs.set(ammTaskKey, ammJob);
      logger.info(`AMM reserve update task for ${networkConfig.networkName} scheduled.`);
    } else {
      logger.info(`AMM reserve update task for ${networkConfig.networkName} is already scheduled.`);
    }

    // Tarea para Staking Pool Total Staked
    if (!activeJobs.has(stakingTaskKey)) {
      logger.info(`Setting up Staking total staked update task for ${networkConfig.networkName}`);
      // Podrías usar un intervalo diferente si es necesario, ej: '*/5 * * * *' para cada 5 minutos
      const stakingJob: ScheduledTask = cron.schedule('*/60 * * * *', async () => { // Cada 1 minuto
        logger.info(`Triggering Staking total staked update task for ${networkConfig.networkName} (cron)`);
        await executeGetTotalStakedForAllPools(prismadb, networkConfig);
      }, { timezone: "UTC" });
      activeJobs.set(stakingTaskKey, stakingJob);
      logger.info(`Staking total staked update task for ${networkConfig.networkName} scheduled.`);
    } else {
      logger.info(`Staking total staked update task for ${networkConfig.networkName} is already scheduled.`);
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