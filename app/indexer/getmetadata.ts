// Constantes de configuración
const SUPRA_RPC_URL = process.env.NEXT_PUBLIC_SUPRA_RPC_URL || '';
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_FA_ADDRESS;
const MODULE_NAME = process.env.NEXT_PUBLIC_PAIR_MODULE;

/**
 * Llama a una función de vista en Supra y devuelve los datos obtenidos.
 * @param functionName Nombre de la función de vista a llamar
 * @param args Argumentos para la función de vista
 * @returns Datos devueltos por la API
 * @throws Error si la llamada falla o no se devuelven datos
 */
export async function callViewFunction(functionName: string, typeArgs:any, args: string): Promise<any> {
  // Construir el nombre completo de la función de vista
  const contractFunctionName = `${CONTRACT_ADDRESS}::${MODULE_NAME}::${functionName}`;
  // Crear el payload para la solicitud
  const payload = {
    function: contractFunctionName,
    type_arguments: typeArgs,
    arguments: [args],
  };
  
  try {
    // Realizar la solicitud POST a la API de Supra
    const response = await fetch(`${SUPRA_RPC_URL}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // Verificar si se recibieron datos
    if (data) {
      return data;
    } else {
      throw new Error("No se devolvieron datos de la función de vista.");
    }
  } catch (error: any) {
    console.log(`❌ Error al llamar a la función de vista ${functionName}:`);
  
    throw new Error(error.message || "Error desconocido al llamar a la API.");  
  }
}

/**
 * Obtiene metadatos de un par AMM dado dos tokens.
 * @param token0 Dirección del primer token
 * @param token1 Dirección del segundo token
 * @returns Metadatos del par AMM
 */
export async function AMMmetadata(typeargs:any[] ,AddressFA: string): Promise<any> {
  // Ejemplo: Llamar a una función de vista hipotética "get_pair_metadata"
  // Ajusta el nombre de la función y los argumentos según tu contrato
  const metadata = await callViewFunction("metadata", typeargs, AddressFA);
  return metadata;
}