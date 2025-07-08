import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';

const logger = createLogger('migrationEventHandler');

export async function handleMigrationEvent(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing MigrationEvent (from TransferEvent)`, event.data);

  const existingEvent = await tx.migration_events.findUnique({
    where: {
      network_transactionHash_sequenceNumber: {
        network: event.network,
        transactionHash: event.transactionHash || 'unknown_tx',
        sequenceNumber: event.sequence_number,
      }
    }
  });

  if (existingEvent) {
    logger.debug(`[${event.network}] MigrationEvent already exists. Skipping creation.`);
    return;
  }

  await tx.migration_events.create({
    data: {
      network: event.network,
      transactionHash: event.transactionHash || 'unknown_tx',
      sequenceNumber: event.sequence_number,
      tokenAddress: event.data.token_address,
      migratorAddress: event.data.user,
      supraAmountAddedToLp: BigInt(event.data.supra_amount),
      tokenAmountAddedToLp: BigInt(event.data.token_amount),
      tokenAmountBurned: BigInt(event.data.burned_amount),
      virtualSupraReservesAtMigration: BigInt(event.data.virtual_supra_reserves),
      virtualTokenReservesAtMigration: BigInt(event.data.virtual_token_reserves),
      timestamp: BigInt(event.timestamp),
    },
  });

  const pool = await tx.poolsDB.findUnique({
    where: {
      network_tokenAddress: {
        network: event.network,
        tokenAddress: event.data.token_address,
      },
    },
  });

  logger.info(`[${event.network}] Processed MigrationEvent for pool ${event.data.token_address}`);
}
