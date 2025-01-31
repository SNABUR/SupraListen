import { EventPoller } from './poller'
import { createLogger } from './utils'

const logger = createLogger('indexer')

let isRunning = false // 🔴 Estado del indexador
let pollerInstance: EventPoller | null = null // Guarda la instancia del poller

export async function startIndexer() {
  if (isRunning) {
    logger.info('Indexer is already running')
    return
  }

  logger.info('Starting Supra Chain Indexer')
  isRunning = true // ✅ Marcamos que el indexador está en ejecución

  pollerInstance = new EventPoller({
    maxRequestsPerSecond: parseInt(process.env.MAX_REQUESTS_PER_SECOND || '10', 10),
    startBlockHeight: process.env.START_BLOCK_HEIGHT ? 
      parseInt(process.env.START_BLOCK_HEIGHT) : undefined
  })

  try {
    await pollerInstance.initialize()
    await pollerInstance.start()
    logger.info('Indexer started successfully')
  } catch (error) {
    logger.error('Fatal error in indexer:', error)
    isRunning = false // ❌ Si falla, restablecemos el estado
    throw error
  }
}

export async function stopIndexer() {

  logger.info('Stopping Supra Chain Indexer...')
  isRunning = false // 🚀 Marcamos el indexador como detenido

  if (pollerInstance) {
    await pollerInstance.stop() // 📌 Detenemos el poller si existe
    pollerInstance = null
  }

  logger.info('Indexer stopped successfully')
}

export function checkIndexerStatus() {
  return isRunning ? 'running' : 'stopped' // 🔍 Devuelve el estado actual
}

export default {
  async fetch(request: Request, env: any, ctx: any) {
    return new Response('Indexer Worker Running')
  },

  async scheduled(event: any, env: any, ctx: any) {
    ctx.waitUntil(startIndexer())
  }
}
