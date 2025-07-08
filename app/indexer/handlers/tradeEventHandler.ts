import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';

const logger = createLogger('tradeEventHandler');

export async function processTradeEvent(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing TradeEvent`, event.data);
  const guidObj = typeof event.guid === 'object' && event.guid !== null ? event.guid : { creation_number: 'unknown', account_address: 'unknown' };

  // --- INICIO DEL NUEVO PATRÓN ---

  // 1. Define los campos que hacen único al TradeEvent
  const uniqueIdentifier = {
    network: event.network,
    creationNumber: String(guidObj.creation_number),
    sequenceNumber: event.sequence_number,
    type: event.type,
  };

  // 2. VERIFICA si el registro ya existe DENTRO de la transacción
  const existingTradeEvent = await tx.tradeEvent.findUnique({
    where: {
      network_creationNumber_sequenceNumber_type: uniqueIdentifier
    },
    select: { id: true } // Solo necesitamos saber si existe, no todos los datos.
  });

  // 3. SI NO EXISTE, créalo.
  if (!existingTradeEvent) {
    logger.info(`[${event.network}] TradeEvent does not exist. CREATING...`);
    await tx.tradeEvent.create({
      data: {
        ...uniqueIdentifier,
        accountAddress: String(guidObj.account_address),
        timestamp: BigInt(event.timestamp),
        isBuy: event.data.is_buy,
        supraAmount: BigInt(event.data.supra_amount),
        tokenAddress: event.data.token_address,
        tokenAmount: BigInt(event.data.token_amount),
        user: event.data.user,
        virtualSupraReserves: BigInt(event.data.virtual_supra_reserves),
        virtualTokenReserves: BigInt(event.data.virtual_token_reserves),
      }
    });
    logger.info(`[${event.network}] Successfully created TradeEvent for user ${event.data.user}`);
  } else {
    logger.debug(`[${event.network}] TradeEvent already exists. Skipping creation.`);
  }

  // --- FIN DEL NUEVO PATRÓN ---
}
