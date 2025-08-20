import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';

const logger = createLogger('tradeEventHandler');

export async function processTradeEvent(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing TradeEvent`, event.data);
  const guidObj = typeof event.guid === 'object' && event.guid !== null ? event.guid : { creation_number: 'unknown', account_address: 'unknown' };

  const uniqueIdentifier = {
    network: event.network,
    creationNumber: String(guidObj.creation_number),
    sequenceNumber: event.sequence_number,
    type: event.type,
  };

  const existingTradeEvent = await tx.tradeEvent.findUnique({
    where: {
      network_creationNumber_sequenceNumber_type: uniqueIdentifier
    },
    select: { id: true }
  });

  if (!existingTradeEvent) {
    logger.info(`[${event.network}] TradeEvent does not exist. CREATING...`);
    const tradeData = {
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
    };

    await tx.tradeEvent.create({ data: tradeData });
    logger.info(`[${event.network}] Successfully created TradeEvent for user ${tradeData.user}`);

    // --- INICIO: LÓGICA PARA ACTUALIZAR TOKEN_HOLDERS (CON BigInt) ---
    logger.info(`[${event.network}] Updating token holder balance for user ${tradeData.user}`);

    // 1. Aseguramos que el usuario exista en la tabla 'users'
    await tx.users.upsert({
      where: {
        network_walletAddress: {
          network: tradeData.network,
          walletAddress: tradeData.user,
        },
      },
      update: {}, // No necesitamos actualizar nada si ya existe
      create: {
        network: tradeData.network,
        walletAddress: tradeData.user,
      },
    });

    // 2. Ahora que el usuario existe, hacemos el upsert en 'token_holders'
    await tx.token_holders.upsert({
      where: {
        network_userWalletAddress_tokenAddress: {
          network: tradeData.network,
          userWalletAddress: tradeData.user,
          tokenAddress: tradeData.tokenAddress,
        },
      },
      update: {
        balance: {
          [tradeData.isBuy ? 'increment' : 'decrement']: tradeData.tokenAmount,
        },
      },
      create: {
        network: tradeData.network,
        userWalletAddress: tradeData.user,
        tokenAddress: tradeData.tokenAddress,
        balance: tradeData.tokenAmount, // Pasamos el BigInt directamente
      },
    });
    logger.info(`[${event.network}] Successfully updated token holder balance for user ${tradeData.user}`);
    // --- FIN: LÓGICA PARA ACTUALIZAR TOKEN_HOLDERS (CON BigInt) ---

  } else {
    logger.debug(`[${event.network}] TradeEvent already exists. Skipping creation.`);
  }
}
