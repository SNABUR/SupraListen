import 'dotenv/config'  // Add this at the top
import { createLogger } from './utils'

const logger = createLogger('rpcClient')

const SUPRA_RPC_URL = process.env.NEXT_PUBLIC_SUPRA_RPC_URL!
const PUMP_SUP_ADDRESS = process.env.NEXT_PUBLIC_SPIKE_ADR!
const PUMP_SUP_MODULE = process.env.NEXT_PUBLIC_MODULE_NAME!
const AMM_ADDRESS = process.env.NEXT_PUBLIC_AMM_ADDRESS!
const AMM_MODULE = process.env.NEXT_PUBLIC_AMM_MODULE!

const MAX_RETRIES = 3
const MAX_BLOCK_RANGE = 10

interface EventResponse {
  events: Array<{
    guid: string
    sequence_number: number
    type: string
    data: any
    timestamp: number
  }>
}

export async function fetchLatestBlockHeight(): Promise<number> {
  try {
    logger.debug(`Fetching latest block height from ${SUPRA_RPC_URL}/block`)
    const response = await fetch(`${SUPRA_RPC_URL}/block`)
    if (!response.ok) { 
      if(response.status == 429) {
        logger.error(`Rate limit exceeded.`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json()
    return data.height
  } catch (error) {
    logger.error('Error fetching latest block height:', error)
    throw error
  }
}

// Add rate limiting configuration
const RATE_LIMIT_DELAY = 1 // Time between requests in ms

export async function fetchBlockEvents(
  startBlock: number,
  endBlock: number
): Promise<any[]> {
  if (endBlock - startBlock > MAX_BLOCK_RANGE) {
    endBlock = startBlock + MAX_BLOCK_RANGE
  }

  let events: any[] = []
  let retries = 0

  while (retries < MAX_RETRIES) {
    try {
      // Group similar events together to reduce API calls
      const moduleEvents = [

       // Pump module events
        ...await fetchEventsByTypes([
          `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::TradeEvent`,
          `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::PumpEvent`,
          `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::TransferEvent`,
          `${PUMP_SUP_ADDRESS}::${PUMP_SUP_MODULE}::UnfreezeEvent`,
          `${AMM_ADDRESS}::${AMM_MODULE}::PairCreatedEvent`,

        ], startBlock, endBlock)
      ]

      events = moduleEvents
      break
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
  eventTypes: string[], 
  startBlock: number, 
  endBlock: number
): Promise<any[]> {
  const events: any[] = []
  
  // Process event types in smaller batches
  for (let i = 0; i < eventTypes.length; i += BATCH_SIZE) {
    const batchTypes = eventTypes.slice(i, i + BATCH_SIZE)
    
    // Fetch batch with retry logic
    const batchPromises = batchTypes.map(async (eventType) => {
      let retries = 0
      while (retries < 3) {
        try {
          const url = `${SUPRA_RPC_URL}/events/${eventType}?start=${startBlock}&end=${endBlock}`
          const response = await fetch(url)

          if (response.status === 429) {
            logger.debug('Rate limit exceeded, sleeping for 2 seconds')
            retries++
            await sleep(RETRY_DELAY * Math.pow(2, retries))
            continue
          }

          if (!response.ok) return []

          const responseData = await response.json()
          if (!responseData?.data?.length) return []

          return responseData.data.map((event: any) => ({
            type: eventType,
            guid: event.guid,
            sequenceNumber: event.sequence_number,
            timestamp: event.data.timestamp ?? -1,
            data: event.data
          }))
        } catch {
          retries++
          await sleep(RETRY_DELAY * Math.pow(2, retries))
        }
      }
      return []
    })

    // Wait for batch to complete
    const batchResults = await Promise.all(batchPromises)
    events.push(...batchResults.flat())
    
    // Add delay between batches
    if (i + BATCH_SIZE < eventTypes.length) {
      await sleep(RATE_LIMIT_DELAY)
    }
  }

  return events
}

// Helper function to handle rate limiting
let lastRequestTime = Date.now()
const MAX_REQUESTS_PER_SECOND = parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10)

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
} 