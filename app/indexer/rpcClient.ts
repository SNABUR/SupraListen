import 'dotenv/config'  // Add this at the top
import { createLogger } from './utils'

const logger = createLogger('rpcClient')

export const SUPRA_RPC_URL_TESTNET = process.env.NEXT_PUBLIC_SUPRA_RPC_URL_TESTNET!
export const SUPRA_RPC_URL_MAINNET = process.env.NEXT_PUBLIC_SUPRA_RPC_URL_MAINNET!
export const CHAIN_ID_SUPRA_TESTNET = process.env.NEXT_PUBLIC_SUPRA_TESTNET ?? 'supra-testnet';
export const CHAIN_ID_SUPRA_MAINNET = process.env.NEXT_PUBLIC_SUPRA_MAINNET ?? 'supra-mainnet';


const SPIKE_FUN_ADDRESS = process.env.NEXT_PUBLIC_SPIKE_FUN_ADR!
const SPIKE_FUN_MODULE = process.env.NEXT_PUBLIC_SPIKE_FUN_MODULE!
const AMM_ADDRESS = process.env.NEXT_PUBLIC_AMM_ADDRESS!
const AMM_MODULE = process.env.NEXT_PUBLIC_SUPRA_AMM_FACTORY_MODULE!
const GAME_ADDRESS = process.env.NEXT_PUBLIC_GAME_ADDRESS!
const GAME_MODULE = process.env.NEXT_PUBLIC_GAME_MODULE!
const STAKING_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS!
const STAKING_MODULE = process.env.NEXT_PUBLIC_STAKING_MODULE!

const MAX_RETRIES = 3
const MAX_BLOCK_RANGE = 10 // Define a reasonable max block range for a single request

interface EventResponse {
  events: Array<{
    guid: string
    sequence_number: number
    type: string
    data: any
    timestamp: number
  }>
}

export interface RpcEvent {
  type: string;
  guid: any; // guid puede ser un objeto { creation_number: string; account_address: string } o string. Ajustar según el uso real.
  sequence_number: string; // Coincide con EventPayload
  timestamp: number; // O string si la API lo devuelve como string y se convierte luego
  data: any;
  network: string; // <--- CAMBIAR A network
  blockHeight?: number | string;
  transactionHash?: string;
}


export async function fetchLatestBlockHeight(rpcUrl: string): Promise<number> {
  try {
    logger.debug(`Fetching latest block height from ${rpcUrl}/block`)
    const response = await fetch(`${rpcUrl}/block`)
    if (!response.ok) {
      if (response.status === 429) {
        logger.warn(`Rate limit exceeded while fetching latest block height from ${rpcUrl}.`);
      }
      throw new Error(`HTTP error! status: ${response.status} from ${rpcUrl}`);
    }
    const data = await response.json()
    logger.debug(`Latest block height from ${rpcUrl}: ${data.height}`)
    return data.height
  } catch (error) {
    logger.error(`Error fetching latest block height from ${rpcUrl}:`, error)
    throw error
  }
}

// Add rate limiting configuration
const RATE_LIMIT_DELAY = 1 // Time between requests in ms

export async function fetchBlockEvents(
  rpcUrl: string,
  network: string,
  startBlock: number,
  endBlock: number
): Promise<RpcEvent[]> {
  if (endBlock - startBlock > MAX_BLOCK_RANGE) {
    logger.warn(`Requested block range ${startBlock}-${endBlock} exceeds MAX_BLOCK_RANGE ${MAX_BLOCK_RANGE}. Clamping to ${startBlock}-${startBlock + MAX_BLOCK_RANGE}.`)
    endBlock = startBlock + MAX_BLOCK_RANGE
  }

  let events: RpcEvent[] = []
  let retries = 0

  // Define event types (could be dynamic or configurable if needed)
  const eventTypesToFetch = [
    `${SPIKE_FUN_ADDRESS}::${SPIKE_FUN_MODULE}::TradeEvent`,
    `${SPIKE_FUN_ADDRESS}::${SPIKE_FUN_MODULE}::PumpEvent`,
    `${SPIKE_FUN_ADDRESS}::${SPIKE_FUN_MODULE}::TransferEvent`,
    // `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::TransferEvent`, // Assuming these are not critical for now or handled elsewhere
    // `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::UnfreezeEvent`,
    `${AMM_ADDRESS}::${AMM_MODULE}::PairCreatedEvent`,
    `${GAME_ADDRESS}::${GAME_MODULE}::GameResult`,
    `${STAKING_ADDRESS}::${STAKING_MODULE}::PoolRegisteredEvent`,
  ];

  while (retries < MAX_RETRIES) {
    try {
      events = await fetchEventsByTypes(
        rpcUrl,
        network,
        eventTypesToFetch,
        startBlock,
        endBlock
      )
      break // Success
    } catch (error) {
      retries++
      if (retries === MAX_RETRIES) throw error
      await sleep(1000 * Math.pow(2, retries))
    }
  }

  return events
}

const BATCH_SIZE = 6  // Adjust based on rate limits
const RETRY_DELAY = 2000

async function fetchEventsByTypes(
  rpcUrl: string,
  network: string,
  eventTypes: string[],
  startBlock: number,
  endBlock: number
): Promise<RpcEvent[]> {
  const allFetchedEvents: RpcEvent[] = []
  //logger.debug(`Fetching events for types [${eventTypes.join(', ')}] from ${rpcUrl}, blocks ${startBlock}-${endBlock}, network: ${network}`)

  // Process event types in smaller batches to avoid overly long URLs or hitting server limits
  for (let i = 0; i < eventTypes.length; i += BATCH_SIZE) {
    const batchEventTypes = eventTypes.slice(i, i + BATCH_SIZE)
    
    const batchPromises = batchEventTypes.map(async (eventType) => {
      let attempt = 0
      while (attempt < MAX_RETRIES) {
        try {
          const apiUrl = `${rpcUrl}/events/${eventType}?start=${startBlock}&end=${endBlock}`
          //logger.debug(`Fetching: ${apiUrl} (Attempt ${attempt + 1})`)
          const response = await fetch(apiUrl)

          if (response.status === 429) {
            const delay = RETRY_DELAY * Math.pow(2, attempt)
            logger.warn(`Rate limit (429) for ${eventType} on ${rpcUrl}. Retrying in ${delay / 1000}s...`)
            await sleep(delay)
            attempt++
            continue
          }

          if (!response.ok) {
            logger.error(`HTTP error ${response.status} for ${eventType} on ${rpcUrl}: ${await response.text()}`)
            // Do not retry on non-429 errors for now, or implement more specific retry logic
            return [] // Return empty for this type if non-recoverable error
          }

          const responseData = await response.json()
          if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
            logger.warn(`No data or malformed data for ${eventType} from ${rpcUrl}:`, responseData)
            return []
          }
          
          if (responseData.data.length === 0) {
            // logger.debug(`No events of type ${eventType} found in block range ${startBlock}-${endBlock} on ${rpcUrl}`);
            return [];
          }

          return responseData.data.map((event: any): RpcEvent => ({
            type: eventType,
            guid: event.guid, // Asumir que event.guid es la estructura correcta o string
            sequence_number: String(event.sequence_number), // Convertir a string para coincidir con EventPayload
            timestamp: Number(event.data.timestamp) || Math.floor(Date.now() / 1000), // Asegurar que es número
            data: event.data,
            network: network,
            blockHeight: event.block_height ?? startBlock,
            transactionHash: event.transaction_hash ?? `unknown_tx_for_${eventType}_block_${startBlock}`
          }))
        } catch (error) {
          const delay = RETRY_DELAY * Math.pow(2, attempt)
          logger.error(`Fetch error for ${eventType} on ${rpcUrl} (attempt ${attempt + 1}):`, error)
          attempt++
          if (attempt < MAX_RETRIES) {
            logger.info(`Retrying in ${delay / 1000}s...`)
            await sleep(delay)
          } else {
            logger.error(`Max retries reached for ${eventType} on ${rpcUrl}. Giving up.`)
            return [] // Return empty for this type after max retries
          }
        }
      }
      return [] // Should be unreachable if loop logic is correct
    })

    const resultsForBatch = await Promise.all(batchPromises)
    resultsForBatch.forEach(eventList => allFetchedEvents.push(...eventList))
    
    // Optional: Add a small delay between batches if still hitting rate limits across different event types
    if (i + BATCH_SIZE < eventTypes.length) {
      await sleep(RATE_LIMIT_DELAY) // Use a small delay
    }
  }
  logger.debug(`Fetched ${allFetchedEvents.length} events in total from ${rpcUrl} for blocks ${startBlock}-${endBlock}`)
  return allFetchedEvents
}

// Helper function to handle rate limiting (already defined, ensure it's used or remove if redundant)
// let lastRequestTime = Date.now() // This seems to be a global for a different rate limiting strategy
const MAX_REQUESTS_PER_SECOND = parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10)

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
} 