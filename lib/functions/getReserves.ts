// src/lib/functions/getReserves.ts
import { callViewFunction } from '../viewFunction/useView'; // Ajusta la ruta y el tipo Network si es necesario
import { createLogger } from '@/app/indexer/utils'; // Para logging
import { NetworkConfig } from '../TaskProcessor'; // Importa la interfaz

const logger = createLogger('getReserves-hook');

// Asumo que NEXT_PUBLIC_AMM_ADDRESS y NEXT_PUBLIC_SUPRA_AMM_FACTORY_MODULE son los correctos
// para la función que devuelve las reservas. Usualmente, get_reserves está en el módulo del PAR, no en la FACTORY.
// Si es una función en la factory que busca el par y luego sus reservas, está bien.
// Revisa si la función se llama "get_reserves" o similar, no "metadata".
// "metadata" usualmente devuelve información sobre el token, no las reservas del pool.
// Aquí asumo que la función que devuelve las reservas se llama "get_reserves" y está en el módulo del factory como indicaste.
// Y que los type_args son los que especificaste. Si "get_reserves" no toma type_args, puedes pasar un array vacío [].
const MODULE_ADDRESS = process.env.NEXT_PUBLIC_AMM_ADDRESS; // Dirección del módulo/contrato
const MODULE_NAME = process.env.NEXT_PUBLIC_SUPRA_AMM_FACTORY_MODULE; // Nombre del módulo

// Es importante que el tipo 'Network' que espera 'callViewFunction' sea compatible
// con lo que le pasamos (que será 'NetworkConfig' o una parte de ella).
// Si 'callViewFunction' espera, por ejemplo, solo el rpcUrl, tendrás que adaptarlo.
// Por ahora, asumiré que 'NetworkConfig' es compatible o que 'callViewFunction'
// puede manejar un objeto que al menos contenga 'rpcUrl'.

/**
 * Fetches reserves for a given token pair from the AMM.
 * @param networkConfig Configuration for the network (RPC URL, etc.)
 * @param token0Address Address of the first token in the pair.
 * @param token1Address Address of the second token in the pair.
 * @returns A promise that resolves to an array [reserve0, reserve1] as strings, or null if an error occurs.
 */
export async function getReservesForPair(
  networkConfig: NetworkConfig, // Usamos NetworkConfig directamente
  token0Address: string,
  token1Address: string
): Promise<[string, string] | null> {
  if (!MODULE_ADDRESS || !MODULE_NAME) {
    logger.error('AMM Factory module address or name is not configured in environment variables.');
    return null;
  }
  const fullModulePath = `${MODULE_ADDRESS}::${MODULE_NAME}`;
  const functionName = 'get_reserves'; // **ASEGÚRATE QUE ESTE ES EL NOMBRE CORRECTO DE LA FUNCIÓN**
                                       // Si es "metadata" y devuelve las reservas, ajusta el parseo de la respuesta.

  // Los type_args suelen ser los tipos de los tokens, ej: [token0Address, token1Address] o sus coin types.
  // Lo que pusiste "0x1::object::ObjectCore" es inusual para get_reserves.
  // Si tu función `get_reserves` no necesita type_args, pasa un array vacío: []
  // Voy a usar lo que pusiste en tu pregunta, pero revísalo:
  const typeArgs: string[] = []; // Ejemplo si no hay type_args
  // const typeArgs: string[] = ["0x1::object::ObjectCore"]; // Si es realmente esto
  // const typeArgs: string[] = [token0Address, token1Address]; // Más común si se esperan tipos de token
  
  // Los args son los addresses de los tokens del par
  const functionArgs: any[] = [token0Address, token1Address];

  try {
    logger.info(`Fetching reserves for pair ${token0Address}-${token1Address} on ${networkConfig.networkName} via ${fullModulePath}::${functionName}`);
    
    // Aquí pasamos networkConfig. Asumo que callViewFunction puede usar rpcUrl de aquí.
    // Si callViewFunction espera un tipo 'Network' específico, deberás adaptar esto:
    // const networkForCall: Network = { rpcUrl: networkConfig.rpcUrl, /* otros campos si son necesarios */ };
    const response = await callViewFunction(
        networkConfig.networkName,
        fullModulePath,
        functionName,
        typeArgs,
        functionArgs
    );
    
    // La respuesta esperada es un array con dos valores [reserveA, reserveB]
    // Asegúrate de que la respuesta de callViewFunction sea parseada correctamente.
    // Prisma espera strings para reserve0 y reserve1, así que convierte los números a string.
    logger.debug(`this is the response from call view function ${response}`)
    if (response && response.result && Array.isArray(response.result) && response.result.length === 2) {
        const reserve0 = String(response.result[0]); // String() es redundante si ya son strings, pero no daña.
        const reserve1 = String(response.result[1]);
        logger.debug(`Reserves received: [${reserve0}, ${reserve1}] for ${token0Address}-${token1Address}`);
        return [reserve0, reserve1];
    } else {
      logger.warn(`Unexpected response structure from ${functionName} for pair ${token0Address}-${token1Address}:`, response);
      return null;
    }
  } catch (error) {
    logger.error(`Error calling view function ${functionName} for pair ${token0Address}-${token1Address} on ${networkConfig.networkName}:`, error);
    return null;
  }
}