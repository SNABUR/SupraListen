// src/lib/functions/getReserves.ts
import { callViewFunction } from '../viewFunction/useView'; // Ajusta la ruta y el tipo Network si es necesario
import { createLogger } from '@/app/indexer/utils'; // Para logging
import { NetworkConfig } from '../TaskProcessor'; // Importa la interfaz

const logger = createLogger('getReserves-hook');


const MODULE_ADDRESS = process.env.NEXT_PUBLIC_STAKING_ADDRESS; 
const MODULE_NAME = process.env.NEXT_PUBLIC_STAKING_MODULE; 

/**
 * Fetches reserves for a given token pair from the AMM.
 * @param networkConfig Configuration for the network (RPC URL, etc.)
 * @param token0Address Address of the first token in the pair.
 * @param token1Address Address of the second token in the pair.
 * @returns A promise that resolves to an array [reserve0, reserve1] as strings, or null if an error occurs.
 */
export async function getPoolTotalStaked(
  networkConfig: NetworkConfig, // Usamos NetworkConfig directamente
  creatorAddress: string,
  token0Address: string,
  token1Address: string
): Promise<[string] | null> {
  if (!MODULE_ADDRESS || !MODULE_NAME) {
    logger.error('Staked module address or name is not configured in environment variables.');
    return null;
  }
  const fullModulePath = `${MODULE_ADDRESS}::${MODULE_NAME}`;
  const functionName = 'get_pool_total_stake';

  const typeArgs: string[] = []; // Ejemplo si no hay type_args
  
  // Los args son los addresses de los tokens del par
  const functionArgs: any[] = [creatorAddress, token0Address, token1Address];

  try {
    logger.info(`Fetching Staked for pair ${token0Address}-${token1Address} on ${networkConfig.networkName} via ${fullModulePath}::${functionName}`);
    
    const response = await callViewFunction(
        networkConfig.networkName,
        fullModulePath,
        functionName,
        typeArgs,
        functionArgs
    );
    
    logger.debug(`this is the response from call view function ${response}`)
    if (response && response.result && Array.isArray(response.result) && response.result.length === 1) {
        const totalStaked = String(response.result[0]); // String() es redundante si ya son strings, pero no daña.
        logger.debug(`Staked received: [${totalStaked}] for ${token0Address}-${token1Address}`);
        return [totalStaked];
    } else {
      logger.warn(`Unexpected response structure from ${functionName} for pair ${token0Address}-${token1Address}:`, response);
      return null;
    }
  } catch (error) {
    logger.error(`Error calling view function ${functionName} for pair ${token0Address}-${token1Address} on ${networkConfig.networkName}:`, error);
    return null;
  }
}