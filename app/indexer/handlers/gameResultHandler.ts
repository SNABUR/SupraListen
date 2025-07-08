import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';

const logger = createLogger('gameResultHandler');

export async function handleGameResultEvent(event: RpcEvent, tx: TransactionClient) {
  try {
    logger.debug(`[${event.network}] Processing GameResultEvent`, event.data);
    await tx.gameResult.create({
      data: {
        network: event.network,
        nonce: BigInt(event.data.nonce),
        player: event.data.player,
        playerMove: event.data.player_move,
        houseMove: event.data.house_move,
        betAmount: BigInt(event.data.bet_amount),
        outcome: event.data.outcome,
        payoutAmount: BigInt(event.data.payout_amount),
        coinTypeName: event.data.coin_type_name,
        season: BigInt(event.data.season),
        timestamp: BigInt(event.timestamp),
      },
    });
    logger.info(`[${event.network}] Processed GameResultEvent for player ${event.data.player}, nonce ${event.data.nonce}`);
  } catch (error) {
    logger.error(`[${event.network}] Error processing GameResultEvent (Player: ${event.data.player}, Nonce: ${event.data.nonce}):`, error);
    throw error;
  }
}
