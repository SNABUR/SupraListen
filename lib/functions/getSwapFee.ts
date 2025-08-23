// src/lib/functions/getSwappFee.ts
import { callViewFunction } from '../viewFunction/useView'; // Ajusta la ruta y el tipo Network si es necesario
import { createLogger } from '@/app/indexer/utils'; // Para logging
import { NetworkConfig } from '../TaskProcessor'; // Importa la interfaz

const logger = createLogger('getSwapFee-hook');


const MODULE_ADDRESS = process.env.NEXT_PUBLIC_AMM_ADDRESS; 
const MODULE_NAME = process.env.NEXT_PUBLIC_SUPRA_AMM_CONTROLLER_MODULE; 

/**
 * Fetches reserves for a given token pair from the AMM.
 * @returns A promise that resolves to an array [reserve0, reserve1] as strings, or null if an error occurs.
 */
export async function getSwapFee(
  networkConfig: NetworkConfig, // Usamos NetworkConfig directamente
): Promise<[string] | null> {
  if (!MODULE_ADDRESS || !MODULE_NAME) {
    logger.error('Staked module address or name is not configured in environment variables.');
    return null;
  }
  const fullModulePath = `${MODULE_ADDRESS}::${MODULE_NAME}`;
  const functionName = 'get_swap_fee';

  const typeArgs: string[] = [];
  
  // Los args son los addresses de los tokens del par
  const functionArgs: any[] = [];

  try {
    logger.info(`Fetching Staked for pair on ${networkConfig.networkName} via ${fullModulePath}::${functionName}`);
    
    const response = await callViewFunction(
        networkConfig.networkName,
        fullModulePath,
        functionName,
        typeArgs,
        functionArgs
    );
    
    logger.debug(`this is the response from call view function ${response}`)
    if (response && response.result && Array.isArray(response.result) && response.result.length === 1) {
        const swapFeeBPS = String(response.result[0]); // String() es redundante si ya son strings, pero no daña.
        logger.debug(`Swap Fee in BPS: [${swapFeeBPS}]`);
        return [swapFeeBPS];
    } else {
      logger.warn(`Unexpected response structure from ${functionName}`, response);
      return null;
    }
  } catch (error) {
    logger.error(`Error calling view function ${functionName} for on ${networkConfig.networkName}:`, error);
    return null;
  }
}