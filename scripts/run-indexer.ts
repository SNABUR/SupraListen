import { startIndexer } from '../app/indexer'
import { createLogger } from '../app/indexer/utils'

const logger = createLogger('local-indexer')

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

logger.info('Starting local indexer...')

startIndexer()
  .catch(error => {
    logger.error('Indexer failed:', error)
    process.exit(1)
  }) 