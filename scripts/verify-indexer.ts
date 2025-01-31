import prismadb from '../lib/prismadb'
import { createLogger } from '../app/indexer/utils'

const logger = createLogger('verify-indexer')

async function verifyIndexedData() {
  try {
    // Check block progress
    const blockProgress = await prismadb.blockProgress.findFirst({
      where: { id: 1 }
    })
    logger.debug('Current block progress:', blockProgress)
    
    // Check failed events
    const failedEvents = await prismadb.eventTracking.findMany({
      where: {
        processed: false
      }
    })
    logger.debug('Failed events:', failedEvents)

  } catch (error) {
    logger.error('Error verifying indexed data:', error)
  } finally {
    await prismadb.$disconnect()
  }
}

verifyIndexedData() 