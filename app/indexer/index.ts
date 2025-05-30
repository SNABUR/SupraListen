// Tu archivo indexer.ts (o como se llame el componente padre)
import { EventPoller } from './poller'
import { createLogger } from './utils'
import {
  SUPRA_RPC_URL_TESTNET,
  SUPRA_RPC_URL_MAINNET,
  CHAIN_ID_SUPRA_TESTNET,
  CHAIN_ID_SUPRA_MAINNET
} from './rpcClient'
// Asegúrate que la importación de NetworkConfig es la correcta, la de TaskProcessor
import { startScheduledTasks, stopScheduledTasks, NetworkConfig as SchedulerNetworkConfig } from '../../lib/TaskProcessor'; // Renombrado para claridad si es necesario

const logger = createLogger('indexer')

let indexerActive = false;

interface PollerInstances {
  testnet?: EventPoller;
  mainnet?: EventPoller;
}
let pollers: PollerInstances = {};

// POLLER_IDS es una buena manera de tener estos strings centralizados si los usas en varios sitios.
const POLLER_IDS = {
  TESTNET: 'supra-testnet',
  MAINNET: 'supra-mainnet'
};

// Esta interfaz ahora usará la NetworkConfig completa del Scheduler
interface SchedulerStartupConfig {
  testnet?: SchedulerNetworkConfig; // Usamos el tipo importado
  mainnet?: SchedulerNetworkConfig; // Usamos el tipo importado
}

export async function startIndexer() {
  const schedulerConfig: SchedulerStartupConfig = {};

  if (SUPRA_RPC_URL_TESTNET && CHAIN_ID_SUPRA_TESTNET) {
    schedulerConfig.testnet = {
      rpcUrl: SUPRA_RPC_URL_TESTNET,
      chainId: CHAIN_ID_SUPRA_TESTNET,
      networkName: POLLER_IDS.TESTNET // Usamos la constante POLLER_IDS
    };
  }
  if (SUPRA_RPC_URL_MAINNET && CHAIN_ID_SUPRA_MAINNET) {
    schedulerConfig.mainnet = {
      rpcUrl: SUPRA_RPC_URL_MAINNET,
      chainId: CHAIN_ID_SUPRA_MAINNET,
      networkName: POLLER_IDS.MAINNET // Usamos la constante POLLER_IDS
    };
  }

  if (indexerActive && (pollers.testnet || pollers.mainnet)) {
    logger.info('Indexer is already running or starting.');
    if (pollers.testnet) logger.info(`Poller ${POLLER_IDS.TESTNET} status: running (assumed)`);
    if (pollers.mainnet) logger.info(`Poller ${POLLER_IDS.MAINNET} status: running (assumed)`);
    // Importante: Pasar la schedulerConfig aquí también si la lógica lo requiere,
    // aunque startScheduledTasks tiene su propia lógica para no reinicializar si ya hay jobs.
    startScheduledTasks(schedulerConfig); 
    return;
  }

  logger.info('Starting Supra Chain Indexer for Testnet and Mainnet...');
  indexerActive = true;

  const pollerConfigBase = {
    maxRequestsPerSecond: parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10),
  };

  if (SUPRA_RPC_URL_TESTNET && CHAIN_ID_SUPRA_TESTNET) {
    logger.info(`Setting up poller for Testnet (ID: ${POLLER_IDS.TESTNET})`);
    pollers.testnet = new EventPoller(
      POLLER_IDS.TESTNET, // Aquí pasas el networkName al poller
      CHAIN_ID_SUPRA_TESTNET,
      SUPRA_RPC_URL_TESTNET,
      pollerConfigBase
    );
  } else {
    logger.warn('Testnet RPC URL or Chain ID not configured. Testnet poller will not start.');
  }

  if (SUPRA_RPC_URL_MAINNET && CHAIN_ID_SUPRA_MAINNET) {
    logger.info(`Setting up poller for Mainnet (ID: ${POLLER_IDS.MAINNET})`);
    pollers.mainnet = new EventPoller(
      POLLER_IDS.MAINNET, // Aquí pasas el networkName al poller
      CHAIN_ID_SUPRA_MAINNET,
      SUPRA_RPC_URL_MAINNET,
      pollerConfigBase
    );
  } else {
    logger.warn('Mainnet RPC URL or Chain ID not configured. Mainnet poller will not start.');
  }

  const startingPollers: Promise<void>[] = [];
  if (pollers.testnet) {
    startingPollers.push(
      pollers.testnet.initialize().then(() => pollers.testnet!.start())
      .catch(err => {
        logger.error(`Error starting Testnet poller:`, err);
        pollers.testnet = undefined;
      })
    );
  }
  if (pollers.mainnet) {
    startingPollers.push(
      pollers.mainnet.initialize().then(() => pollers.mainnet!.start())
      .catch(err => {
        logger.error(`Error starting Mainnet poller:`, err);
        pollers.mainnet = undefined;
      })
    );
  }

  if (startingPollers.length === 0 && Object.keys(schedulerConfig).length === 0) {
    logger.warn('No pollers were configured or started, and no scheduler config provided. Indexer effectively idle.');
    indexerActive = false; 
    return; 
  } else if (startingPollers.length === 0 && Object.keys(schedulerConfig).length > 0) {
     logger.warn('No pollers were configured or started, but scheduler config provided. Attempting to start scheduled tasks.');
  }

  // La schedulerConfig ya contiene los networkName correctos
  startScheduledTasks(schedulerConfig);

  if (startingPollers.length > 0) {
    try {
      await Promise.all(startingPollers);
      logger.info('All configured indexer pollers started (or attempted to start).');
    } catch (error) {
      logger.error('An error occurred during the startup of one or more pollers:', error);
    }
  }
}

// ... (el resto de tu archivo stopIndexer, checkIndexerStatus, y el default export se mantienen igual)
export async function stopIndexer() {
  logger.info('Stopping Supra Chain Indexer...');
  indexerActive = false; 

  stopScheduledTasks();

  const stoppingPollers: Promise<void>[] = [];
  if (pollers.testnet) {
    logger.info(`Stopping Testnet poller (ID: ${POLLER_IDS.TESTNET})...`);
    stoppingPollers.push(pollers.testnet.stop().catch(err => logger.error(`Error stopping Testnet poller:`, err)));
  }
  if (pollers.mainnet) {
    logger.info(`Stopping Mainnet poller (ID: ${POLLER_IDS.MAINNET})...`);
    stoppingPollers.push(pollers.mainnet.stop().catch(err => logger.error(`Error stopping Mainnet poller:`, err)));
  }

  if (stoppingPollers.length > 0) {
    await Promise.all(stoppingPollers);
  }
  
  pollers = {}; 
  logger.info('Indexer pollers stopped (or attempted to stop).');
}

export function checkIndexerStatus() {
  let status = `Indexer service is ${indexerActive ? 'active' : 'inactive'}.`;
  if (indexerActive) {
    status += ` Testnet poller: ${pollers.testnet ? 'configured' : 'not configured/failed'}.`;
    status += ` Mainnet poller: ${pollers.mainnet ? 'configured' : 'not configured/failed'}.`;
  }
  return status;
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url);
    if (url.pathname === "/status") {
      return new Response(checkIndexerStatus());
    }
    if (url.pathname === "/start") {
      ctx.waitUntil(startIndexer()); 
      return new Response("Indexer start initiated.");
    }
    if (url.pathname === "/stop") {
      ctx.waitUntil(stopIndexer()); 
      return new Response("Indexer stop initiated.");
    }
    return new Response('Indexer Worker Running. Use /status, /start, or /stop.');
  },

  async scheduled(event: any, env: any, ctx: any) {
    logger.info('Scheduled event triggered. Ensuring indexer is running...');
    ctx.waitUntil(startIndexer());
  }
}