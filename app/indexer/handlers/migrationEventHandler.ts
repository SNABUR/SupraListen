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
    logger.debug(`[${event.network}] MigrationEvent with txHash ${event.transactionHash} already exists. Skipping creation.`);
    return;
  }

  // Asumiendo que event.data ahora coincide con la nueva estructura
  await tx.migration_events.create({
    data: {
      network: event.network,
      transactionHash: event.transactionHash || 'unknown_tx',
      sequenceNumber: event.sequence_number,
      token_address: event.data.token_address,
      migrator: event.data.migrator,
      supra_sent_to_lp: BigInt(event.data.supra_sent_to_lp),
      tokens_sent_to_lp: BigInt(event.data.tokens_sent_to_lp),
      dev_reward_staked: BigInt(event.data.dev_reward_staked),
      staking_pool_reward: BigInt(event.data.staking_pool_reward),
      migrator_reward: BigInt(event.data.migrator_reward),
      excess_supra_collected: BigInt(event.data.excess_supra_collected),
    },
  });

  logger.info(`[${event.network}] Processed MigrationEvent for migrator ${event.data.migrator} and token ${event.data.token_address}`);
}
