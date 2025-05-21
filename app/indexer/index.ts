import { EventPoller } from './poller'
import { createLogger } from './utils'
import {
  SUPRA_RPC_URL_TESTNET,
  SUPRA_RPC_URL_MAINNET,
  CHAIN_ID_SUPRA_TESTNET,
  CHAIN_ID_SUPRA_MAINNET
} from './rpcClient'

const logger = createLogger('indexer')

let indexerActive = false; // Global state for the indexer service

interface PollerInstances {
  testnet?: EventPoller;
  mainnet?: EventPoller;
}
let pollers: PollerInstances = {};

const POLLER_IDS = {
  TESTNET: 'supra-testnet',
  MAINNET: 'supra-mainnet'
};

export async function startIndexer() {
  if (indexerActive && (pollers.testnet || pollers.mainnet)) {
    logger.info('Indexer is already running or starting.');
    // Check status of individual pollers if needed
    if (pollers.testnet) logger.info(`Poller ${POLLER_IDS.TESTNET} status: running (assumed)`);
    if (pollers.mainnet) logger.info(`Poller ${POLLER_IDS.MAINNET} status: running (assumed)`);
    return;
  }

  logger.info('Starting Supra Chain Indexer for Testnet and Mainnet...');
  indexerActive = true;

  const pollerConfigBase = {
    maxRequestsPerSecond: parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10),
    // startBlockHeight is now handled within EventPoller using BlockProgress
  };

  // Create Testnet Poller
  if (SUPRA_RPC_URL_TESTNET && CHAIN_ID_SUPRA_TESTNET) {
    logger.info(`Setting up poller for Testnet (ID: ${POLLER_IDS.TESTNET})`);
    pollers.testnet = new EventPoller(
      POLLER_IDS.TESTNET,
      CHAIN_ID_SUPRA_TESTNET,
      SUPRA_RPC_URL_TESTNET,
      pollerConfigBase
    );
  } else {
    logger.warn('Testnet RPC URL or Chain ID not configured. Testnet poller will not start.');
  }

  // Create Mainnet Poller
  if (SUPRA_RPC_URL_MAINNET && CHAIN_ID_SUPRA_MAINNET) {
    logger.info(`Setting up poller for Mainnet (ID: ${POLLER_IDS.MAINNET})`);
    pollers.mainnet = new EventPoller(
      POLLER_IDS.MAINNET,
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
        // Optionally remove the poller or mark as failed
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

  if (startingPollers.length === 0) {
    logger.warn('No pollers were configured or started. Indexer effectively idle.');
    indexerActive = false; // No pollers, so indexer is not really active
    return;
  }

  try {
    await Promise.all(startingPollers);
    logger.info('All configured indexer pollers started (or attempted to start).');
  } catch (error) {
    // This catch might not be strictly necessary if individual pollers handle their errors
    logger.error('An error occurred during the startup of one or more pollers:', error);
    // indexerActive remains true, but some pollers might have failed.
    // Individual poller health should be monitored if possible.
  }
}

export async function stopIndexer() {
  logger.info('Stopping Supra Chain Indexer...');
  indexerActive = false; // Signal that the indexer service should stop

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
  
  pollers = {}; // Clear instances
  logger.info('Indexer pollers stopped (or attempted to stop).');
}

export function checkIndexerStatus() {
  // Could be enhanced to return status per poller
  let status = `Indexer service is ${indexerActive ? 'active' : 'inactive'}.`;
  if (indexerActive) {
    status += ` Testnet poller: ${pollers.testnet ? 'configured' : 'not configured/failed'}.`;
    status += ` Mainnet poller: ${pollers.mainnet ? 'configured' : 'not configured/failed'}.`;
    // Note: 'configured' doesn't mean 'running without errors'. True status is complex.
  }
  return status;
}

// This part is for Cloudflare Workers or similar environments
export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Could add an endpoint to check status or trigger start/stop for admin purposes
    const url = new URL(request.url);
    if (url.pathname === "/status") {
      return new Response(checkIndexerStatus());
    }
    if (url.pathname === "/start") {
      ctx.waitUntil(startIndexer()); // Non-blocking start
      return new Response("Indexer start initiated.");
    }
    if (url.pathname === "/stop") {
      ctx.waitUntil(stopIndexer()); // Non-blocking stop
      return new Response("Indexer stop initiated.");
    }
    return new Response('Indexer Worker Running. Use /status, /start, or /stop.');
  },

  async scheduled(event: any, env: any, ctx: any) {
    logger.info('Scheduled event triggered. Ensuring indexer is running...');
    // This will attempt to start the indexer if it's not already running.
    // If it is running, startIndexer should ideally be idempotent or log that it's already active.
    ctx.waitUntil(startIndexer());
  }
}
