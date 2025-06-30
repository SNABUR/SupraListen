import { fetchBlockEvents, fetchLatestBlockHeight, RpcEvent } from './rpcClient'
import { processEvents } from './eventProcessor'
import { sleep, createLogger } from './utils'
import prismadb from '@/lib/prismadb'

const logger = createLogger('poller')

const BATCH_SIZE = 10 // How many blocks to process in one fetchBlockEvents call
// const MAX_RETRIES = 3 // Max retries for fetching events, already handled in rpcClient
const POLLING_INTERVAL = 2000 // 1 second, when caught up to latest block
const DEFAULT_PROGRESS_SAVE_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

interface PollerInstanceConfig {
  maxRequestsPerSecond: number;
  progressSaveIntervalMs?: number; // Optional: override default save interval
}

export class EventPoller {
  private readonly pollerId: string;
  private readonly network: string;
  private readonly rpcUrl: string;
  private readonly maxRequestsPerSecond: number;
  private readonly progressSaveInterval: number;

  private isRunning: boolean = false;
  private currentBlockHeight: number = 0;
  private latestBlockHeight: number = 0;
  private lastProgressSaveTime: number = 0;
  private highestProcessedBlockInInterval: number = 0; // Tracks the highest block processed since last save
  private lastSavedBlockHeight: number = 0; // Tracks the last height actually saved to DB

  constructor(pollerId: string, network: string, rpcUrl: string, config: PollerInstanceConfig) {
    this.pollerId = pollerId;
    this.network = network;
    this.rpcUrl = rpcUrl;
    this.maxRequestsPerSecond = config.maxRequestsPerSecond;
    this.progressSaveInterval = config.progressSaveIntervalMs || DEFAULT_PROGRESS_SAVE_INTERVAL_MS;
    logger.info(`EventPoller instance created for ID: ${this.pollerId}, network: ${this.network}, RPC: ${this.rpcUrl}, Save Interval: ${this.progressSaveInterval / 1000 / 60} mins`);
  }

  async initialize() {
    logger.info(`[${this.pollerId}] Initializing...`);
    const blockProgress = await prismadb.block_progress.findUnique({
      where: { network: this.pollerId }
    });

    if (blockProgress) {
      this.lastSavedBlockHeight = Number(blockProgress.lastBlockHeight);
      this.currentBlockHeight = this.lastSavedBlockHeight + 1;
      this.highestProcessedBlockInInterval = this.lastSavedBlockHeight;
      logger.info(`[${this.pollerId}] Resuming from block ${this.currentBlockHeight} (last saved: ${this.lastSavedBlockHeight})`);
    } else {
      const defaultStartBlock = process.env[`START_BLOCK_HEIGHT_${this.pollerId.toUpperCase()}`]
        ? parseInt(process.env[`START_BLOCK_HEIGHT_${this.pollerId.toUpperCase()}`]!)
        : 1;
      
      logger.info(`[${this.pollerId}] No existing block progress record found for network ID '${this.pollerId}'.`);
      logger.info(`[${this.pollerId}] Attempting to use start block from ENV var START_BLOCK_HEIGHT_${this.pollerId.toUpperCase()}: ${process.env[`START_BLOCK_HEIGHT_${this.pollerId.toUpperCase()}`]}`);
      logger.info(`[${this.pollerId}] Default start block determined as: ${defaultStartBlock}.`);

      this.currentBlockHeight = defaultStartBlock;
      this.lastSavedBlockHeight = defaultStartBlock - 1; // Simulate that the block before was "saved"
      this.highestProcessedBlockInInterval = defaultStartBlock - 1;
      
      logger.info(`[${this.pollerId}] Starting from block ${this.currentBlockHeight}. Creating new progress record with lastBlockHeight ${this.lastSavedBlockHeight}...`);
      try {
        await prismadb.block_progress.create({
          data: {
            network: this.pollerId,
            lastBlockHeight: BigInt(this.lastSavedBlockHeight),
          }
        });
        logger.info(`[${this.pollerId}] Successfully created new progress record.`);
      } catch (createError) {
        logger.error(`[${this.pollerId}] CRITICAL: Failed to create new progress record for ${this.pollerId}:`, createError);
        throw new Error(`Failed to create initial block progress for ${this.pollerId}. Poller cannot start.`);
      }
    }
    this.lastProgressSaveTime = Date.now(); // Initialize save time

    try {
      this.latestBlockHeight = await fetchLatestBlockHeight(this.rpcUrl);
      logger.info(`[${this.pollerId}] Initialized. Current Polling Block: ${this.currentBlockHeight}, Latest Chain Block: ${this.latestBlockHeight}`);
    } catch (error) {
      logger.error(`[${this.pollerId}] Failed to fetch latest block height during initialization:`, error);
      this.latestBlockHeight = this.currentBlockHeight;
    }
  }

  async start() {
    if (this.isRunning) {
      logger.warn(`[${this.pollerId}] Poller is already running.`);
      return;
    }
    this.isRunning = true;
    this.lastProgressSaveTime = Date.now(); // Reset save time when poller starts
    logger.info(`[${this.pollerId}] Starting event poller...`);
  
    while (this.isRunning) {
      try {
        if (!this.isRunning) break;
        
        await this.updateLatestBlockHeightIfNeeded();

        let processedSomethingInLoop = false;
        if (this.currentBlockHeight <= this.latestBlockHeight) {
          await this.processBatch(); // This will update highestProcessedBlockInInterval
          processedSomethingInLoop = true;
        }
        
        // Check if it's time to save progress
        const now = Date.now();
        if (now - this.lastProgressSaveTime >= this.progressSaveInterval) {
          if (this.highestProcessedBlockInInterval > this.lastSavedBlockHeight) {
            await this.saveProgressToDb();
          } else {
            // If no new blocks were processed to be saved, but interval passed, just update timestamp to avoid frequent checks
            // Or log that no save was needed.
            // logger.debug(`[${this.pollerId}] Progress save interval reached, but no new blocks processed since last save.`);
            this.lastProgressSaveTime = now; // Still update to mark the check
          }
        }

        if (!processedSomethingInLoop && !(this.currentBlockHeight <= this.latestBlockHeight) ) {
          // Caught up and no batch processed, wait before checking again
          // logger.debug(`[${this.pollerId}] Caught up to block ${this.latestBlockHeight}. Waiting...`);
          await sleep(POLLING_INTERVAL);
        } else if (!processedSomethingInLoop) {
          // This case might occur if we are waiting for latestBlockHeight to advance.
          // Add a small sleep to prevent tight loop if not caught up but also not processing.
           await sleep(Math.min(POLLING_INTERVAL, 100)); // Sleep a bit
        }

      } catch (error) {
        logger.error(`[${this.pollerId}] Error in polling loop:`, error instanceof Error ? error.message : String(error));
        await sleep(POLLING_INTERVAL * 2);
      }
    }
    // Poller is stopping
    logger.info(`[${this.pollerId}] Event poller loop ended. Attempting final progress save...`);
    await this.saveProgressToDb(); // Final save on stop
    logger.info(`[${this.pollerId}] Event poller fully stopped.`);
  }
  
  private async saveProgressToDb() {
    if (this.highestProcessedBlockInInterval <= this.lastSavedBlockHeight) {
      logger.debug(`[${this.pollerId}] No new progress to save. Highest processed: ${this.highestProcessedBlockInInterval}, Last saved: ${this.lastSavedBlockHeight}`);
      this.lastProgressSaveTime = Date.now(); // Update time to reset interval timer
      return;
    }
    try {
      logger.info(`[${this.pollerId}] Saving progress. LastBlockHeight: ${this.highestProcessedBlockInInterval}`);
      await prismadb.block_progress.update({
        where: { network: this.pollerId },
        data: { lastBlockHeight: BigInt(this.highestProcessedBlockInInterval) }
      });
      this.lastSavedBlockHeight = this.highestProcessedBlockInInterval;
      this.lastProgressSaveTime = Date.now();
      logger.info(`[${this.pollerId}] Successfully saved progress to DB. LastBlockHeight: ${this.lastSavedBlockHeight}`);
    } catch (error) {
      logger.error(`[${this.pollerId}] Failed to save progress to DB:`, error);
      // Decide if we should retry saving or what the consequence is.
      // For now, the error is logged, and lastProgressSaveTime is not updated, so it will try again soon.
    }
  }

  async stop() {
    logger.info(`[${this.pollerId}] Attempting to stop event poller (setting isRunning to false)...`);
    this.isRunning = false;
    // The main loop will detect isRunning = false, exit, and then call saveProgressToDb() as a final step.
  }

  private async processBatch() {
    if (this.latestBlockHeight < this.currentBlockHeight) {
        await this.updateLatestBlockHeightIfNeeded();
        if (this.latestBlockHeight < this.currentBlockHeight) {
            logger.warn(`[${this.pollerId}] Latest block height (${this.latestBlockHeight}) is still behind current processing block (${this.currentBlockHeight}). Waiting.`);
            await sleep(POLLING_INTERVAL);
            return;
        }
    }

    const endBlock = Math.min(
      this.currentBlockHeight + BATCH_SIZE - 1,
      this.latestBlockHeight
    );

    if (this.currentBlockHeight > endBlock) {
      return;
    }

    logger.info(`[${this.pollerId}] Processing blocks ${this.currentBlockHeight} to ${endBlock} (Latest: ${this.latestBlockHeight})`);

    let events: RpcEvent[] = [];
    try {
      events = await fetchBlockEvents(this.rpcUrl, this.pollerId, this.currentBlockHeight, endBlock + 1);
      
      if (events.length > 0) {
        logger.info(`[${this.pollerId}] Fetched ${events.length} events from blocks ${this.currentBlockHeight}-${endBlock}.`);
        // processEvents is wrapped in a transaction by its caller if needed, or handles its own.
        // Here, we are not saving progress block by block, so the transaction for processEvents is self-contained.
        await prismadb.$transaction(async (tx) => { // Transaction for processing events
            await processEvents(events, tx);
        });
        // logger.info(`[${this.pollerId}] Successfully processed events for blocks up to ${endBlock}.`);
      }
      // Whether events were found or not, this range of blocks is considered "processed" for this interval.
      this.highestProcessedBlockInInterval = endBlock;
      // logger.debug(`[${this.pollerId}] Updated highestProcessedBlockInInterval to: ${this.highestProcessedBlockInInterval}`);
      this.currentBlockHeight = endBlock + 1;
    } catch (error) {
      logger.error(`[${this.pollerId}] Error processing batch ${this.currentBlockHeight}-${endBlock}:`, error instanceof Error ? error.stack : String(error));
      throw error;
    }
  }

  private async updateLatestBlockHeightIfNeeded() {
    try {
      const newLatestBlockHeight = await fetchLatestBlockHeight(this.rpcUrl);
      if (newLatestBlockHeight > this.latestBlockHeight) {
        logger.info(`[${this.pollerId}] Updated latest block height from ${this.latestBlockHeight} to ${newLatestBlockHeight}`);
        this.latestBlockHeight = newLatestBlockHeight;
      }
    } catch (error) {
      logger.error(`[${this.pollerId}] Error fetching latest block height:`, error instanceof Error ? error.message : String(error));
    }
  }
}