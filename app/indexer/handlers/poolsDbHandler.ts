import { RpcEvent, TransactionClient } from '../types';
import { createLogger } from '../utils';

const logger = createLogger('poolsDbHandler');

export async function handlePumpEvent(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing PumpEvent (for PoolsDB)`, event.data);
  
  await tx.poolsDB.create({
    data: {
      network: event.network,
      description: event.data.description,
      dev: event.data.dev,
      initialVirtualSupraReserves: BigInt(event.data.initial_virtual_supra_reserves),
      initialVirtualTokenReserves: BigInt(event.data.initial_virtual_token_reserves),
      name: event.data.name,
      platformFee: parseInt(event.data.platform_fee),
      pool: event.data.pool,
      symbol: event.data.symbol,
      telegram: event.data.telegram,
      tokenAddress: event.data.token_address,
      tokenDecimals: event.data.token_decimals,
      twitter: event.data.twitter,
      github: event.data.github || null,
      stream: event.data.stream || null,
      uri: event.data.uri,
      website: event.data.website,
      unstakePeriodSeconds: event.data.unstake_period_seconds ? BigInt(event.data.unstake_period_seconds) : null,
      project_type: event.data.project_type || null,
    }
  });
  logger.info(`[${event.network}] Processed PumpEvent, created/updated PoolsDB for ${event.data.name}`);

  logger.debug(`[${event.network}] Creating initial state entry in TradeEvent for pool ${event.data.token_address}`);

  const guidObj = typeof event.guid === 'object' && event.guid !== null 
    ? event.guid 
    : { creation_number: 'unknown_pump_event_cn', account_address: 'unknown_pump_event_aa' };

  await tx.tradeEvent.create({
    data: {
      network: event.network,
      type: 'initial_state',
      creationNumber: String(guidObj.creation_number),
      accountAddress: String(guidObj.account_address),
      sequenceNumber: event.sequence_number,
      timestamp: BigInt(event.timestamp),
      isBuy: false,
      supraAmount: BigInt(0),
      tokenAmount: BigInt(0),
      user: event.data.dev,
      tokenAddress: event.data.token_address,
      virtualSupraReserves: BigInt(event.data.initial_virtual_supra_reserves),
      virtualTokenReserves: BigInt(event.data.initial_virtual_token_reserves),
    }
  });
  
  logger.info(`[${event.network}] Successfully created initial state TradeEvent for pool ${event.data.name}`);
}
