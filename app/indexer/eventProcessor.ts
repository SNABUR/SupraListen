import prismadb from '@/lib/prismadb'
import { createLogger } from './utils'
import { AMMmetadata } from './getmetadata'

const logger = createLogger('eventProcessor')
const MODULE_PATH = `${process.env.NEXT_PUBLIC_SPIKE_ADR}::${process.env.NEXT_PUBLIC_MODULE_NAME}`
const MODULE_PATH_AMM = `${process.env.NEXT_PUBLIC_AMM_ADDRESS}::${process.env.NEXT_PUBLIC_AMM_MODULE}`

type TransactionClient = Omit<
  typeof prismadb,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>

export async function processEvents(events: any[], tx: TransactionClient) {
  logger.debug(`Processing ${events.length} events`)
  
  for (const event of events) {
    try {
      logger.debug(`Processing event of type ${event.type}`)
      
      // Crear registro de seguimiento del evento
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
        case `${MODULE_PATH_AMM}::PairCreatedEvent`:
          await processPairAMM(event, tx)
          break
        default:
          logger.warn(`Unknown event type: ${event.type}`)
      }

      // Marcar el evento como procesado
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
      
      // Actualizar el registro de seguimiento en caso de error
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

async function processPairAMM(event: any, tx: TransactionClient) {
  try {
    logger.debug('Processing PairCreatedEvent', event);

    const typeargs: string[] = ["0x1::object::ObjectCore"];

    // Obtener metadata de token0
    let metadataFA0 = null;
    try {
      metadataFA0 = await AMMmetadata(typeargs, event.data.token0);
      console.log('metadataFA0:', metadataFA0);
    } catch (err) {
      logger.error('Error obteniendo metadataFA0:', err);
    }

    // Obtener metadata de token1
    let metadataFA1 = null;
    try {
      metadataFA1 = await AMMmetadata(typeargs, event.data.token1);
      console.log('metadataFA1:', metadataFA1);
    } catch (err) {
      logger.error('Error obteniendo metadataFA1:', err);
    }

    await tx.ammpair.create({
      data: {
        pair: event.data.pair,
        creator: event.data.creator,
        token0: event.data.token0,
        token1: event.data.token1,

        // Metadata Token 0 (con fallback si falla)
        token0Name: metadataFA0?.result?.[0]?.name ?? '',
        token0Symbol: metadataFA0?.result?.[0]?.symbol ?? '',
        token0Decimals: metadataFA0?.result?.[0]?.decimals ?? 0,
        token0IconUri: metadataFA0?.result?.[0]?.icon_uri ?? '',
        token0ProjectUri: metadataFA0?.result?.[0]?.project_uri ?? '',

        // Metadata Token 1 (con fallback si falla)
        token1Name: metadataFA1?.result?.[0]?.name ?? '',
        token1Symbol: metadataFA1?.result?.[0]?.symbol ?? '',
        token1Decimals: metadataFA1?.result?.[0]?.decimals ?? 0,
        token1IconUri: metadataFA1?.result?.[0]?.icon_uri ?? '',
        token1ProjectUri: metadataFA1?.result?.[0]?.project_uri ?? '',
      },
    });

  } catch (error) {
    logger.error('Error procesando PairCreatedEvent:', error);
  }

  logger.info('Processed PairCreatedEvent')
}
