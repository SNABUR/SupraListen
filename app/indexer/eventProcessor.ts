import prismadb from '@/lib/prismadb'
import { createLogger } from './utils'

const logger = createLogger('eventProcessor')
const MODULE_PATH = `${process.env.NEXT_PUBLIC_SPIKE_ADR}::${process.env.NEXT_PUBLIC_MODULE_NAME}`
const TOKEN_MODULE_PATH = `${process.env.NEXT_PUBLIC_TOKENS_MODULE_ADDRESS}::${process.env.NEXT_PUBLIC_TOKENS_MODULE_NAME}`

type TransactionClient = Omit<
  typeof prismadb,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export async function processEvents(events: any[], tx: TransactionClient) {
  logger.debug(`Processing ${events.length} events`)
  
  for (const event of events) {
    try {
      logger.debug(`Processing event of type ${event.type}`)
      
      // Create event tracking record
      await tx.eventTracking.create({
        data: {
          eventType: event.type,
          blockHeight: BigInt(event.blockHeight || 0),
          transactionHash: event.transactionHash || '',
          processed: false,
          error: null
        }
      })

      switch (event.type) {
        case `${MODULE_PATH}::TradeEvent`:
          await processTradeEvent(event, tx)
          break
        case `${MODULE_PATH}::PumpEvent`:
          await processPoolsDB(event, tx)
          break
        
        default:
          logger.warn(`Unknown event type: ${event.type}`)
      }

      // Update event as processed
      await tx.eventTracking.updateMany({
        where: {
          eventType: event.type,
          blockHeight: BigInt(event.blockHeight || 0),
          processed: false
        },
        data: {
          processed: true
        }
      })

    } catch (error) {
      logger.error(`Error processing event ${event.type}:`, error)
      
      // Log failed event
      await tx.eventTracking.updateMany({
        where: {
          eventType: event.type,
          blockHeight: BigInt(event.blockHeight || 0),
          processed: false
        },
        data: {
          error: error instanceof Error ? error.message : String(error),
          processed: false
        }
      })

      throw error
    }
  }
}


async function processTradeEvent(event: any, tx: TransactionClient) {
  logger.debug('Processing token burn', event)
  await tx.tradeEvent.create({
    data: {
      type: event.type,
      creationNumber: event.guid.creation_number,
      accountAddress: event.guid.account_address,
      sequenceNumber: event.sequenceNumber,
      timestamp: BigInt(event.timestamp),
      isBuy: event.data.is_buy,
      supraAmount: BigInt(event.data.supra_amount),
      tokenAddress: event.data.token_address,
      tokenAmount: BigInt(event.data.token_amount),
      user: event.data.user,
      virtualSupraReserves: BigInt(event.data.virtual_supra_reserves),
      virtualTokenReserves: BigInt(event.data.virtual_token_reserves),
    }
  })
  console.log('Processing token burn event finished')

  logger.info(`Processed TokenBurnEvent`)
}


async function processPoolsDB(event: any, tx: TransactionClient) {
  logger.debug('Processing token mint', event)

  await tx.poolsDB.create({
    data: {
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
      uri: event.data.uri,
      website: event.data.website,
    }
  })

}