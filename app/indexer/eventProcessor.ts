import prismadb from '@/lib/prismadb';
import { createLogger } from './utils';
import { RpcEvent } from './types';
import { 
  processTradeEvent,
  handlePumpEvent,
  handleMigrationEvent,
  handlePairCreatedEvent,
  handleGameResultEvent,
  handleRegisterPoolEvent
} from './handlers';
import { signalDB } from '../../lib/signalDB'; // IMPORTAMOS EL GESTOR DE SEÑALES

const logger = createLogger('eventProcessor');

const MODULE_PATH = `${process.env.NEXT_PUBLIC_SPIKE_FUN_ADR}::${process.env.NEXT_PUBLIC_SPIKE_FUN_MODULE}`;
const MODULE_PATH_AMM = `${process.env.NEXT_PUBLIC_AMM_ADDRESS}::${process.env.NEXT_PUBLIC_SUPRA_AMM_FACTORY_MODULE}`;
const MODULE_PATH_GAME = `${process.env.NEXT_PUBLIC_GAME_ADDRESS}::${process.env.NEXT_PUBLIC_GAME_MODULE}`;
const MODULE_PATH_STAKING = `${process.env.NEXT_PUBLIC_STAKING_ADDRESS}::${process.env.NEXT_PUBLIC_STAKING_MODULE}`;

export async function processEvents(events: RpcEvent[], network: string, tx: any) { // Added network parameter
  logger.debug(`Processing ${events.length} RpcEvents in current batch for network ${network}.`); // Updated log

  for (const event of events) {
    const currentBlockHeight = event.blockHeight !== undefined ? BigInt(event.blockHeight) : BigInt(0);
    const currentTransactionHash = event.transactionHash || `unknown_tx_hash_for_${event.type}_block_${event.blockHeight}`;
    const currentSequenceNumber = event.sequence_number || `unknown_seq_num_for_${event.type}_block_${event.blockHeight}`;
    const eventUniqueIdentifierForLog = `Tx:${currentTransactionHash} Seq:${currentSequenceNumber} Type:${event.type} Net:${network}`; // Used new network parameter

    try {
      await prismadb.$transaction(async (tx) => {
        logger.debug(`Starting transaction for event: ${eventUniqueIdentifierForLog}`);

        const eventTrackingEntry = await tx.eventTracking.upsert({
          where: {
            network_transactionHash_sequenceNumber_eventType: {
              network: network, // Used new network parameter
              transactionHash: currentTransactionHash,
              sequenceNumber: currentSequenceNumber,
              eventType: event.type,
            }
          },
          create: {
            network: network, // Used new network parameter
            eventType: event.type,
            blockHeight: currentBlockHeight,
            transactionHash: currentTransactionHash,
            sequenceNumber: currentSequenceNumber,
            processed: false,
            error: null,
          },
          update: {
            error: null,
            processed: false,
          },
        });

        if (eventTrackingEntry.processed) {
          throw new Error('ALREADY_PROCESSED');
        }
        
        // Usamos `endsWith` para ser flexibles con la dirección del módulo, que cambia entre redes.
        if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_SPIKE_FUN_MODULE}::TradeEvent`)) {
            logger.info(`[${network}] TradeEvent detected. Processing...`); // Used new network parameter
            await processTradeEvent(event, tx);
            logger.info(`[${network}] TradeEvent processed. Adding signal...`); // Used new network parameter
            signalDB.addSignal(network); // Passed network to addSignal
            logger.info(`[${network}] Signal added.`); // Used new network parameter
        } else if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_SPIKE_FUN_MODULE}::PumpEvent`)) {
            await handlePumpEvent(event, tx);
        } else if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_SPIKE_FUN_MODULE}::MigrationToAmmEvent`)) {
            await handleMigrationEvent(event, tx);
        } else if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_SUPRA_AMM_FACTORY_MODULE}::PairCreatedEvent`)) {
            await handlePairCreatedEvent(event, tx);
        } else if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_GAME_MODULE}::GameResult`)) {
            await handleGameResultEvent(event, tx);
        } else if (event.type.endsWith(`::${process.env.NEXT_PUBLIC_STAKING_MODULE}::PoolRegisteredEvent`)) {
            await handleRegisterPoolEvent(event, tx);
        } else {
            logger.warn(`[${network}] Unknown event type: ${event.type}`); // Used new network parameter
        }

        await tx.eventTracking.update({
          where: { id: eventTrackingEntry.id },
          data: {
            processed: true,
            error: null,
          },
        });
        
        logger.info(`Successfully processed and committed transaction for event ${eventUniqueIdentifierForLog}.`);

      }, {
        timeout: 30000, 
      });

    } catch (error: any) {
      if (error.message === 'ALREADY_PROCESSED') {
        logger.info(`Event ${eventUniqueIdentifierForLog} was already marked as processed. Skipping.`);
        continue;
      }

      const errorMessage = error.message || String(error);
      logger.error(`Transaction for event ${eventUniqueIdentifierForLog} FAILED and was rolled back. Error: ${errorMessage}`);
      
      try {
        await prismadb.eventTracking.updateMany({
            where: {
              network: network, // Used new network parameter
              transactionHash: currentTransactionHash,
              sequenceNumber: currentSequenceNumber,
              eventType: event.type,
            },
            data: {
              error: errorMessage.substring(0, 1000),
              processed: false,
            },
        });
        logger.warn(`Error for event ${eventUniqueIdentifierForLog} has been logged to EventTracking.`);
      } catch (loggingError: any) {
        logger.error(`CRITICAL: Could not log the error to EventTracking for ${eventUniqueIdentifierForLog}. Logging Error: ${loggingError.message}`);
      }
    }
  }

  logger.info(`Finished processing batch of ${events.length} events for network ${network}.`); // Updated log
}