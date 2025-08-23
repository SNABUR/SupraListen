// src/lib/tasks/executeGetTotalStaked.ts
import { PrismaClient } from '../../prisma/generated/main_db';
import { NetworkConfig } from '../TaskProcessor';
import { getPoolTotalStaked } from '../functions/getTotalStaked'; // Importa la función correcta
import { createLogger } from '@/app/indexer/utils';

const logger = createLogger('executeGetTotalStaked-task');

const DELAY_BETWEEN_CALLS_MS = 10000; // 10 segundos

/**
 * Fetches and updates totalStakedAmount for all StakingPools on a given network.
 */
export async function executeGetTotalStakedForAllPools(prisma: PrismaClient, config: NetworkConfig) {
  if (!config || !config.rpcUrl || !config.networkName) {
    logger.warn(`Task for ${config?.networkName || 'unknown network'} skipped due to incomplete configuration.`);
    return;
  }

  logger.info(`Starting totalStakedAmount update task for StakingPools on ${config.networkName}`);

  try {
    const stakingPools = await prisma.staking_pools.findMany({
      where: {
        network: config.networkName,
        // Opcional: podrías añadir `stakesClosed: false` si solo te interesan los pools activos
      },
      select: {
        id: true, // Para actualizar la BD
        creatorAddress: true,     // Necesario para getPoolTotalStaked
        stakeTokenAddress: true,  // Necesario para getPoolTotalStaked
        rewardTokenAddress: true, // Necesario para getPoolTotalStaked
      },
    });

    if (stakingPools.length === 0) {
      logger.info(`No StakingPools found on ${config.networkName} to update totalStakedAmount.`);
      return;
    }

    logger.info(`Found ${stakingPools.length} StakingPool(s) to process on ${config.networkName}.`);

    for (const pool of stakingPools) {
      const poolIdentifierForLog = `DB_ID: ${pool.id}, Creator: ${pool.creatorAddress}, Stake: ${pool.stakeTokenAddress}, Reward: ${pool.rewardTokenAddress}`;
      logger.info(`Processing StakingPool: ${poolIdentifierForLog}`);
      
      // Llama a getPoolTotalStaked con las tres direcciones como argumentos separados
      const totalStakedResult = await getPoolTotalStaked(
        config,
        pool.creatorAddress,
        pool.stakeTokenAddress,
        pool.rewardTokenAddress
      );

      // totalStakedResult es [string] | null
      if (totalStakedResult && totalStakedResult.length === 1) {
        const totalStakedValue = totalStakedResult[0]; // Extrae el valor string del array
        try {
          await prisma.staking_pools.update({
            where: {
              id: pool.id,
            },
            data: {
              totalStakedAmount: totalStakedValue, // Actualiza el campo correcto
              // Considera añadir un campo como `totalStakedLastUpdatedAt: new Date()`
            },
          });
          logger.info(`Successfully updated totalStakedAmount for ${poolIdentifierForLog} to: ${totalStakedValue}`);
        } catch (dbError) {
          logger.error(`Failed to update totalStakedAmount in DB for ${poolIdentifierForLog}:`, dbError);
        }
      } else {
        logger.warn(`Could not fetch totalStakedAmount for ${poolIdentifierForLog}. Skipping update. Result: ${JSON.stringify(totalStakedResult)}`);
      }

      logger.debug(`Waiting ${DELAY_BETWEEN_CALLS_MS / 1000} seconds before next pool...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CALLS_MS));
    }

    logger.info(`TotalStakedAmount update task for StakingPools on ${config.networkName} completed.`);

  } catch (error) {
    logger.error(`Unhandled error during totalStakedAmount update task for ${config.networkName}:`, error);
  }
}