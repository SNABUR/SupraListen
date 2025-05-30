// src/lib/tasks/executeGetReserves.ts
import { PrismaClient } from '@prisma/client';
import { NetworkConfig } from '../TaskProcessor'; // Importa la interfaz
import { getReservesForPair } from '../functions/getReserves'; // Importa tu hook
import { createLogger } from '@/app/indexer/utils'; // Para logging

const logger = createLogger('executeGetReserves-task');

const DELAY_BETWEEN_CALLS_MS = 10000; // 10 segundos

/**
 * Fetches and updates reserves for all AMM pairs on a given network.
 * @param prisma PrismaClient instance.
 * @param config Network configuration.
 */
export async function executeGetReservesForAllPairs(prisma: PrismaClient, config: NetworkConfig) {
  if (!config || !config.rpcUrl || !config.networkName) {
    logger.warn(`Attempted to run task for ${config?.networkName || 'unknown network'} without full configuration.`);
    return;
  }

  logger.info(`Starting reserve update task for ${config.networkName} (RPC: ${config.rpcUrl})!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!`);

  try {
    const ammPairs = await prisma.ammpair.findMany({
      where: {
        network: config.networkName, // Filtra por la red actual
        // podrías añadir más filtros, ej: verified: true, si solo quieres pares verificados
      },
      select: {
        id: true,
        pair: true, // Útil para logging, es la dirección del par
        token0Address: true,
        token1Address: true,
      },
    });

    if (ammPairs.length === 0) {
      logger.info(`No AMM pairs found for network ${config.networkName} to update reserves.`);
      return;
    }

    logger.info(`Found ${ammPairs.length} AMM pair(s) to process for ${config.networkName}.`);

    for (const pair of ammPairs) {
      logger.info(`Processing pair: ${pair.pair} (ID: ${pair.id}) on ${config.networkName}`);
      
      // Aquí necesitas el networkConfig para `getReservesForPair`
      const reserves = await getReservesForPair(
        config, // Pasamos la configuración de la red
        pair.token0Address,
        pair.token1Address
      );

      if (reserves) {
        const [reserve0, reserve1] = reserves;
        try {
          await prisma.ammpair.update({
            where: {
              id: pair.id,
              // También puedes usar la clave única si la tienes y es más conveniente
              // network_pair: {
              //   network: config.networkName,
              //   pair: pair.pair
              // }
            },
            data: {
              reserve0: reserve0, // Ya son strings desde getReservesForPair
              reserve1: reserve1,
              lastStatsUpdate: new Date(), // Actualiza el timestamp
            },
          });
          logger.info(`Successfully updated reserves for pair ${pair.pair} (ID: ${pair.id}): [${reserve0}, ${reserve1}]`);
        } catch (dbError) {
          logger.error(`Failed to update reserves in DB for pair ${pair.pair} (ID: ${pair.id}):`, dbError);
        }
      } else {
        logger.warn(`Could not fetch reserves for pair ${pair.pair} (ID: ${pair.id}). Skipping update.`);
      }

      // Esperar 10 segundos antes de la siguiente llamada
      logger.debug(`Waiting ${DELAY_BETWEEN_CALLS_MS / 1000} seconds before next pair...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CALLS_MS));
    }

    logger.info(`Reserve update task for ${config.networkName} completed successfully.`);

  } catch (error) {
    logger.error(`Unhandled error during reserve update task for ${config.networkName}:`, error);
  }
}