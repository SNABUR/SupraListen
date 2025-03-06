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
  logger.info(`Processed Pump event`)
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

async function getOrCreateToken(tokenAddress: string, tx: TransactionClient) {
  // Buscar si el token ya existe por su dirección (id)
  let token = await tx.token.findUnique({
    where: { id: tokenAddress },
  });

  if (!token) {
    // Si no existe, obtener metadatos
    const typeargs: string[] = ["0x1::object::ObjectCore"];
    const metadata = await AMMmetadata(typeargs, tokenAddress);

    if (metadata && metadata.result && metadata.result[0]) {
      const tokenData = metadata.result[0];
      token = await tx.token.create({
        data: {
          id: tokenAddress,
          name: tokenData.name ?? '',
          symbol: tokenData.symbol ?? '',
          decimals: tokenData.decimals ?? 0,
          iconUri: tokenData.icon_uri ?? '',
          projectUri: tokenData.project_uri ?? '',
        },
      });
      logger.info(`Created new token with address ${tokenAddress}`);
    } else {
      throw new Error(`No se pudieron obtener metadatos para el token ${tokenAddress}`);
    }
  }

  return token;
}

async function processPairAMM(event: any, tx: TransactionClient) {
  try {
    logger.debug('Processing PairCreatedEvent', event);

    // Get or create tokens
    const token0 = await getOrCreateToken(event.data.token0, tx);
    const token1 = await getOrCreateToken(event.data.token1, tx);

    // Crear el registro de ammpair con referencias a los tokens
    await tx.ammpair.create({
      data: {
        pair: event.data.pair,
        creator: event.data.creator,
        token0Id: token0.id,
        token1Id: token1.id,
      },
    });
    logger.debug(`Created AMM pair ${event.data.pair} with tokens ${token0.id} and ${token1.id}`);

  } catch (error) {
    logger.error('Error procesando PairCreatedEvent:', error);
    throw error;
  }

  logger.info('Processed PairCreatedEvent');
}