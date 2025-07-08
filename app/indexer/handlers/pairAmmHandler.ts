import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';
import { getOrCreateToken } from '../dbUtils';

const logger = createLogger('pairAmmHandler');

export async function handlePairCreatedEvent(event: RpcEvent, tx: TransactionClient) {
  try {
    logger.debug(`[${event.network}] Processing PairCreatedEvent`, event.data);

    const existingPair = await tx.ammpair.findUnique({
      where: {
        network_pair: {
          network: event.network,
          pair: event.data.pair,
        }
      }
    });

    if (existingPair) {
      logger.debug(`[${event.network}] AMM pair ${event.data.pair} already exists. Skipping creation.`);
      return;
    }

    const token0 = await getOrCreateToken(event.data.token0, event.network, tx);
    const token1 = await getOrCreateToken(event.data.token1, event.network, tx);

    await tx.ammpair.create({
      data: {
        pair: event.data.pair,
        creator: event.data.creator,
        network: event.network,
        token0: {
          connect: {
            network_id: { id: token0.id, network: token0.network } 
          }
        },
        token1: {
          connect: {
            network_id: { id: token1.id, network: token1.network } 
          }
        },
      },
    });
    logger.info(`[${event.network}] Created AMM pair ${event.data.pair} with tokens ${token0.id} (${token0.network}) and ${token1.id} (${token1.network})`);

  } catch (error) {
    logger.error(`[${event.network}] Error processing PairCreatedEvent for pair ${event.data.pair}:`, error);
    throw error;
  }
}
