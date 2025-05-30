// Constantes de configuración
import { createLogger } from '@/app/indexer/utils'; // Para logging
const logger = createLogger('executeGetReserves-task');

const SUPRA_RPC_URL_TESTNET = process.env.NEXT_PUBLIC_SUPRA_RPC_URL_TESTNET || '';
const SUPRA_RPC_URL_MAINNET = process.env.NEXT_PUBLIC_SUPRA_RPC_URL_MAINNET || '';

// Mapeo de identificadores de red a URLs RPC
const RPC_URLS: Record<string, string> = {
  'supra-testnet': SUPRA_RPC_URL_TESTNET, // Clave coincide con el valor de 'network'
  'supra-mainnet': SUPRA_RPC_URL_MAINNET, // Clave coincide con el valor de 'network'
};

/**
 * Llama a una función de vista en Supra y devuelve los datos obtenidos.
 * @param network Identificador de la red ('testnet', 'mainnet')
 * @param functionName Nombre de la función de vista a llamar
 * @param typeArgs Argumentos de tipo para la función de vista
 * @param args Argumentos para la función de vista
 * @returns Datos devueltos por la API
 * @throws Error si la llamada falla o no se devuelven datos
 */
export async function callViewFunction(
  network: string, // Nuevo parámetro
  modulepath: string,
  functionName: string,
  typeArgs: any[], // Corregido a array
  args: string[]   // Corregido a array de strings, ya que `payload.arguments` es un array
): Promise<any> {
  const rpcUrl = RPC_URLS[network];
  if (!rpcUrl) {
    throw new Error(`Unsupported network: ${network}. No RPC URL configured.`);
  }

  // ¿Son CONTRACT_ADDRESS y MODULE_NAME diferentes por red?
  // Si es así, también necesitarás obtenerlos basados en 'network'.
  // Ejemplo:
  // const contractAddressForNetwork = getContractAddressForNetwork(network);
  // const moduleNameForNetwork = getModuleNameForNetwork(network);
  // const contractFunctionName = `${contractAddressForNetwork}::${moduleNameForNetwork}::${functionName}`;
  // Por ahora, asumiré que son los mismos, pero es un punto importante.
  // Si las direcciones de los contratos son diferentes por red, necesitas una forma de obtener la correcta.
  // Podrías tener:
  // NEXT_PUBLIC_FA_ADDRESS_TESTNET, NEXT_PUBLIC_FA_ADDRESS_MAINNET, etc.
  // Y luego seleccionarlos en base al parámetro `network`.
  const contractFunctionName = `${modulepath}::${functionName}`;

  // Ejemplo si las direcciones de contrato varían por red:
  if (network === 'testnet') {
      // currentContractAddress = process.env.NEXT_PUBLIC_FA_ADDRESS_TESTNET || CONTRACT_ADDRESS;
      // currentModuleName = process.env.NEXT_PUBLIC_PAIR_MODULE_TESTNET || MODULE_NAME;
  } else if (network === 'mainnet') {
      // currentContractAddress = process.env.NEXT_PUBLIC_FA_ADDRESS_MAINNET || CONTRACT_ADDRESS;
      // currentModuleName = process.env.NEXT_PUBLIC_PAIR_MODULE_MAINNET || MODULE_NAME;
  }
  // Asegúrate de tener estas variables de entorno si las direcciones cambian.


  const payload = {
    function: contractFunctionName,
    type_arguments: typeArgs,
    arguments: args, // `arguments` en el payload de view function es un array de strings
  };
  
  try {
    const response = await fetch(`${rpcUrl}/view`, { // Usar rpcUrl dinámico
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Intentar leer el cuerpo del error para más detalles
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = await response.text();
      }
      logger.error(`❌ Error en la respuesta de la API de Supra (${response.status}) para ${functionName} en ${network}:`, errorData);
      throw new Error(`Supra API request failed with status ${response.status} for ${functionName} on ${network}. Details: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    if (data) { // `data` puede ser un array vacío `[]` si la función view devuelve eso, lo cual es válido.
                 // O `null` si la función devuelve `Option::None` serializado.
      logger.debug("this is the data!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", data)
      return data;
    } else {
      // Esta condición es un poco ambigua. Si la API devuelve un 200 OK con `null` o `[]`, ¿es un error?
      // Usualmente no. Es mejor verificar si `data.error` existe o si el status no fue 200.
      // Ya se maneja con `!response.ok` arriba.
      // Si una función view devuelve un array vacío, eso es un resultado válido.
      // console.warn(`No data explicitly returned from view function ${functionName} on ${network}, but request was successful. Response:`, data);
      return data; // Devolver `data` incluso si es `null` o `[]` si la respuesta fue OK.
    }
  } catch (error: any) {
    // No loguear `error.message` directamente aquí si ya lo hiciste o si el error de fetch ya es descriptivo.
    console.error(`❌ Error al llamar a la función de vista ${functionName} en ${network}:`, error);
    // Re-lanzar el error para que el llamador pueda manejarlo.
    throw error; // Podría ser ya un Error con un mensaje útil.
  }
}