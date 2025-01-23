import { EventPoller } from './poller'
import { createLogger } from './utils'

const logger = createLogger('indexer')

export async function startIndexer() {
  logger.info('Starting Supra Chain Indexer')
  
  const poller = new EventPoller({
    maxRequestsPerSecond: parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10),
    startBlockHeight: process.env.START_BLOCK_HEIGHT ? 
      parseInt(process.env.START_BLOCK_HEIGHT) : undefined
  })

  try {
    await poller.initialize()
    await poller.start()
  } catch (error) {
    logger.error('Fatal error in indexer:', error)
    throw error
  }
}

// For worker environments
export default {
  async fetch(request: Request, env: any, ctx: any) {
    // Handle HTTP requests if needed
    return new Response('Indexer Worker Running')
  },

  async scheduled(event: any, env: any, ctx: any) {
    ctx.waitUntil(startIndexer())
  }
} 