import prismadb from '@/lib/prismadb'; // Asumo que esto exporta tu PrismaClient instanciado
import { createLogger } from './utils';
import { callViewFunction } from './getmetadata'; // Asumo que esta función es compatible o se adapta

const logger = createLogger('eventProcessor');
// Estas variables de entorno deben apuntar a las direcciones correctas
const MODULE_PATH = `${process.env.NEXT_PUBLIC_SPIKE_ADR}::${process.env.NEXT_PUBLIC_MODULE_NAME}`;
const MODULE_PATH_AMM = `${process.env.NEXT_PUBLIC_AMM_ADDRESS}::${process.env.NEXT_PUBLIC_AMM_MODULE}`;
const MODULE_PATH_GAME = `${process.env.NEXT_PUBLIC_GAME_ADDRESS}::${process.env.NEXT_PUBLIC_GAME_MODULE}`;
// ¡OJO AQUÍ! process.env.NEXT_PUBLIC_STAKING_ADDRESS se repite. Debería ser MODULE_NAME para staking
const MODULE_PATH_STAKING = `${process.env.NEXT_PUBLIC_STAKING_ADDRESS}::${process.env.NEXT_PUBLIC_STAKING_MODULE}`; // Asumo que tienes una variable para el nombre del módulo de staking

const MODULE_PATH_METADATA = `${process.env.NEXT_PUBLIC_FA_ADDRESS}::${process.env.NEXT_PUBLIC_PAIR_MODULE}`; // Asumo que tienes una variable para el nombre del módulo de metadatos
const MODULE_PATH_WRAPED = `${process.env.NEXT_PUBLIC_STAKING_ADDRESS}::${process.env.NEXT_PUBLIC_STAKING_ROUTE}`; // Asumo que tienes una variable para el nombre del módulo de metadatos

// Interfaz RpcEvent (Asegúrate de que esta interfaz ahora use 'network' o ajústalo)
export interface RpcEvent {
  type: string;
  guid: any; // O { creation_number: string; account_address: string }; o string;
  sequence_number: string;
  data: any;
  network: string; // CAMBIADO de chainId a network
  blockHeight?: string | number;
  transactionHash?: string;
  timestamp: string | number; // Asegúrate que timestamp esté presente y sea string o number
}

type TransactionClient = Omit<
  typeof prismadb,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

interface PoolRegisteredEventData {
  pool_key: {
    creator_addr: string;
    stake_addr: string;
    reward_addr: string;
  };
  is_dynamic: boolean;
  start_timestamp: string; // u64
  initial_end_timestamp: string; // u64
  initial_reward_per_sec: string; // u128
  boost_enabled: boolean; // Asumo que este campo existe en tus datos de evento
}


export async function processEvents(events: RpcEvent[], tx: TransactionClient) {
  logger.debug(`Processing ${events.length} RpcEvents in current batch.`);

  for (const event of events) {
    const currentBlockHeight = event.blockHeight !== undefined ? BigInt(event.blockHeight) : BigInt(0);
    // Asegúrate de que transactionHash y sequenceNumber sean siempre cadenas no vacías si son parte de tu clave única.
    // Si pueden ser null/undefined del RpcEvent, necesitas un placeholder consistente o ajustar tu unique constraint.
    const currentTransactionHash = event.transactionHash || `unknown_tx_hash_for_${event.type}_block_${event.blockHeight}`;
    const currentSequenceNumber = event.sequence_number || `unknown_seq_num_for_${event.type}_block_${event.blockHeight}`;

    // Identificador único para el log y para EventTracking
    const eventUniqueIdentifierForLog = `Tx:${currentTransactionHash} Seq:${currentSequenceNumber} Type:${event.type} Net:${event.network}`;

    try {
      logger.debug(`Starting processing for event: ${eventUniqueIdentifierForLog}`);

      // 1. Verificar/Crear/Actualizar EventTracking de forma idempotente
      let eventTrackingEntry = await tx.eventTracking.findFirst({
        where: {
          network: event.network,
          transactionHash: currentTransactionHash,
          sequenceNumber: currentSequenceNumber,
          eventType: event.type,
        },
      });

      if (eventTrackingEntry && eventTrackingEntry.processed) {
        logger.info(`Event ${eventUniqueIdentifierForLog} already processed successfully. Skipping.`);
        continue; // Saltar al siguiente evento en el lote
      }

      if (!eventTrackingEntry) {
        logger.debug(`Creating new EventTracking entry for ${eventUniqueIdentifierForLog}.`);
        eventTrackingEntry = await tx.eventTracking.create({
          data: {
            network: event.network,
            eventType: event.type,
            blockHeight: currentBlockHeight,
            transactionHash: currentTransactionHash,
            sequenceNumber: currentSequenceNumber,
            processed: false,
            error: null,
          },
        });
      } else if (eventTrackingEntry.error) {
        // Si ya existía pero con error, limpiamos el error para reintentar
        logger.info(`Event ${eventUniqueIdentifierForLog} previously failed. Clearing error for retry.`);
        await tx.eventTracking.update({
          where: { id: eventTrackingEntry.id }, // Actualizar por ID es más seguro y eficiente
          data: { error: null, processed: false }, // Asegurar processed: false
        });
      }
      // En este punto, tenemos un eventTrackingEntry (nuevo o existente con error limpiado)

      // 2. Procesar el evento específico
      // (Los manejadores como handleRegisterPoolEvent ahora deberían manejar P2002 internamente
      // y no relanzarlos si es solo un "ya existe")
      switch (event.type) {
        case `${MODULE_PATH}::TradeEvent`:
          await processTradeEvent(event, tx);
          break;
        case `${MODULE_PATH}::PumpEvent`:
          await processPoolsDB(event, tx);
          break;
        case `${MODULE_PATH_AMM}::PairCreatedEvent`:
          await processPairAMM(event, tx);
          break;
        case `${MODULE_PATH_GAME}::GameResult`:
          await handleGameResultEvent(event, tx);
          break;
        case `${MODULE_PATH_STAKING}::PoolRegisteredEvent`:
          await handleRegisterPoolEvent(event, tx);
          break;
        default:
          logger.warn(`[${event.network}] Unknown event type: ${event.type} for ${eventUniqueIdentifierForLog}`);
          // Considerar si esto debería ser un error que se guarda en EventTracking
          // Por ahora, solo es un warning y se marcará como procesado si no hay más errores.
      }

      // 3. Marcar el evento como procesado exitosamente en EventTracking
      // Usar el ID del eventTrackingEntry es más preciso que updateMany por múltiples campos.
      logger.debug(`Successfully processed event ${eventUniqueIdentifierForLog}. Marking as processed.`);
      await tx.eventTracking.update({
        where: { id: eventTrackingEntry.id },
        data: {
          processed: true,
          error: null, // Asegurar que se limpie cualquier error si el procesamiento fue exitoso
        },
      });

    } catch (error) { // Captura errores relanzados por los manejadores de eventos o errores inesperados
      const errorMessage = error instanceof Error ? error.message : String(error);
      // Usar un stack trace si está disponible para errores de JS
      const errorStack = error instanceof Error ? error.stack : undefined;
      logger.error(`Error processing event ${eventUniqueIdentifierForLog}. Message: ${errorMessage}`, errorStack ? `\nStack: ${errorStack}` : '');

      // Intentar actualizar EventTracking con el error.
      // Necesitamos encontrar el ID del eventTrackingEntry si se creó antes del error,
      // o si la creación inicial falló, no habrá nada que actualizar (lo cual es un problema diferente).
      // La lógica actual ya crea/encuentra eventTrackingEntry antes del switch, así que deberíamos tenerlo.
      // Sin embargo, si el error ocurrió ANTES de que se creara o encontrara eventTrackingEntry,
      // esta actualización no tendría un 'id' válido.
      // Por simplicidad, asumimos que el eventTrackingEntry se obtuvo/creó.
      // Si el error fue ANTES de crear eventTrackingEntry, esta parte no se ejecutará de todos modos
      // porque el error haría saltar al catch del `EventPoller.processBatch`.

      // Para ser robustos, verificamos si tenemos un eventTrackingEntry.id
      // (si el error ocurrió después de su creación/búsqueda)
      const eventTrackingIdToUpdate = await tx.eventTracking.findFirst({
          select: { id: true }, // Solo necesitamos el id
          where: {
              network: event.network,
              transactionHash: currentTransactionHash,
              sequenceNumber: currentSequenceNumber,
              eventType: event.type,
          }
      });

      if (eventTrackingIdToUpdate) {
        try {
          logger.debug(`Attempting to mark event ${eventUniqueIdentifierForLog} with error in EventTracking.`);
          await tx.eventTracking.update({
            where: { id: eventTrackingIdToUpdate.id },
            data: {
              error: errorMessage.substring(0, 1000), // Limitar longitud del mensaje de error
              processed: false,
            },
          });
          logger.warn(`Event ${eventUniqueIdentifierForLog} marked with error in EventTracking.`);
        } catch (updateError: any) {
          logger.error(`CRITICAL: Failed to update EventTracking for errored event ${eventUniqueIdentifierForLog}. Transaction may be aborted. Error during update:`, updateError.message);
          // Si esta actualización falla (ej: por error 25P02 de TX abortada),
          // relanzamos para que la transacción del LOTE ENTERO falle.
          // Esto indica un problema más grave que un simple error de procesamiento de evento.
          throw updateError;
        }
      } else {
        logger.error(`CRITICAL: Could not find EventTracking entry to mark with error for ${eventUniqueIdentifierForLog}. This indicates an issue with EventTracking creation/finding logic.`);
        // En este caso, también es prudente fallar la transacción del lote.
        // Podríamos construir el error aquí o simplemente relanzar el 'error' original.
        // Para simplificar, relanzamos el error original, que hará fallar la tx del lote.
        throw error;
      }
      // NO relanzar el 'error' original aquí si el updateMany tuvo éxito,
      // para permitir que el bucle `for` continúe con otros eventos.
      // Si 'updateError' fue relanzado, la ejecución ya se detuvo para este evento.
    }
  }
  logger.info(`Finished processing batch of ${events.length} events.`);
}

async function processTradeEvent(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing TradeEvent`, event.data);
  const guidObj = typeof event.guid === 'object' && event.guid !== null ? event.guid : { creation_number: 'unknown', account_address: 'unknown' };

  await tx.tradeEvent.create({
    data: {
      network: event.network, // CAMBIADO
      type: event.type,
      creationNumber: String(guidObj.creation_number),
      accountAddress: String(guidObj.account_address),
      sequenceNumber: event.sequence_number,
      timestamp: BigInt(event.timestamp),
      isBuy: event.data.is_buy,
      supraAmount: BigInt(event.data.supra_amount),
      tokenAddress: event.data.token_address,
      tokenAmount: BigInt(event.data.token_amount),
      user: event.data.user,
      virtualSupraReserves: BigInt(event.data.virtual_supra_reserves),
      virtualTokenReserves: BigInt(event.data.virtual_token_reserves),
    }
  });
  logger.info(`[${event.network}] Processed TradeEvent for user ${event.data.user}`);
}

async function processPoolsDB(event: RpcEvent, tx: TransactionClient) {
  logger.debug(`[${event.network}] Processing PumpEvent (for PoolsDB)`, event.data);
  
  await tx.poolsDB.create({
    data: {
      network: event.network, // CAMBIADO
      description: event.data.description,
      dev: event.data.dev,
      initialVirtualSupraReserves: BigInt(event.data.initial_virtual_supra_reserves),
      initialVirtualTokenReserves: BigInt(event.data.initial_virtual_token_reserves),
      name: event.data.name,
      platformFee: parseInt(event.data.platform_fee),
      pool: event.data.pool,
      symbol: event.data.symbol,
      telegram: event.data.telegram,
      tokenAddress: event.data.token_address, // Este es el tokenAddress del pool, no una relación directa a Token aquí
      tokenDecimals: event.data.token_decimals,
      twitter: event.data.twitter,
      uri: event.data.uri,
      website: event.data.website,
    }
  });
  logger.info(`[${event.network}] Processed PumpEvent, created/updated PoolsDB for ${event.data.name}`);
}

// getOrCreateToken ahora usa 'network'
// En eventProcessor.ts

async function getOrCreateToken(
  tokenAddress: string,
  network: string,
  tx: TransactionClient
): Promise<import('@prisma/client').Token> {
  if (!tokenAddress) {
    logger.error(`[${network}] Attempted to get or create token with null or undefined address.`);
    throw new Error(`Token address cannot be null or undefined for network ${network}`);
  }

  let token = await tx.token.findUnique({
    where: { network_id: { network: network, id: tokenAddress } },
  });

  // Si el token ya existe Y ya tiene metadatos completos, lo devolvemos.
  if (token && token.metadataFetched) {
    logger.debug(`[${network}] Token ${tokenAddress} found with complete metadata.`);
    return token;
  }

  // Si el token no existe, O existe pero le faltan metadatos (es un "fantasma"),
  // intentamos obtener/refrescar los metadatos.
  logger.info(`[${network}] Token ${tokenAddress} ${token ? 'exists as minimal entry or lacks metadata' : 'not found'}. Fetching metadata...`);

  let metadataSuccess = false;
  let tokenDataFromRpc: any = null; // Para almacenar los datos del RPC
  let originalCoinTypeFromRpc: string | null = null;

  try {
    const typeArgsForMetadata: string[] = ["0x1::object::ObjectCore"]; // Ajusta si es necesario
    const metadataResponse = await callViewFunction(network, MODULE_PATH_METADATA, "metadata", typeArgsForMetadata, [tokenAddress]);

    if (metadataResponse && metadataResponse.result && metadataResponse.result[0]) {
      tokenDataFromRpc = metadataResponse.result[0];
      // Validar que los campos esperados existan en tokenDataFromRpc antes de usarlos
      if (typeof tokenDataFromRpc.name === 'string' &&
          typeof tokenDataFromRpc.symbol === 'string' &&
          typeof tokenDataFromRpc.decimals === 'number') { // O el tipo que esperes
        metadataSuccess = true;
        logger.info(`[${network}] Successfully fetched metadata for ${tokenAddress}: Name=${tokenDataFromRpc.name}, Symbol=${tokenDataFromRpc.symbol}, Decimals=${tokenDataFromRpc.decimals}`);
      } else {
        logger.warn(`[${network}] Metadata fetched for ${tokenAddress}, but structure is unexpected or missing key fields.`, tokenDataFromRpc);
      }
    } else {
      logger.warn(`[${network}] Metadata call successful but no data/result found for ${tokenAddress}. Raw response:`, metadataResponse);
    }
  } catch (rpcError: any) {
    logger.error(`[${network}] RPC call to fetch metadata for ${tokenAddress} failed. Error: ${rpcError.message}. Will proceed with/create minimal entry if token is new.`);
    // No relanzamos el error aquí, para permitir la creación del "fantasma"
  }

  try {
    // La función "get_original_from_address" usualmente no necesita type_arguments, solo la dirección del token envuelto.
    const wrappedResponse = await callViewFunction(network, MODULE_PATH_WRAPED, "get_original_from_address", [], [tokenAddress]);

    if (wrappedResponse && wrappedResponse.result && wrappedResponse.result.length > 0) {
      const potentialOriginalAddress = wrappedResponse.result[0];
      if (typeof potentialOriginalAddress === 'string') {
        // Solo lo consideramos "envuelto" si la dirección original es DIFERENTE a la del token actual.
        if (potentialOriginalAddress !== tokenAddress && potentialOriginalAddress !== "0x0" && !potentialOriginalAddress.startsWith("0x00000000000000000000000000000000")) { // Evitar dirección nula como original
            originalCoinTypeFromRpc = potentialOriginalAddress;
            logger.info(`[${network}] Successfully fetched original address for ${tokenAddress}: ${originalCoinTypeFromRpc}. It's a wrapped token.`);
        } else if (potentialOriginalAddress === tokenAddress) {
            logger.debug(`[${network}] Original address for ${tokenAddress} is itself. Not a distinctly wrapped token.`);
        } else {
             logger.debug(`[${network}] get_original_from_address for ${tokenAddress} returned zero address or invalid address: ${potentialOriginalAddress}.`);
        }
      } else if (potentialOriginalAddress === null) {
        // Si la función devuelve Option<address> y el token no está envuelto, puede devolver None (que se traduce a null en JSON).
        logger.info(`[${network}] Token ${tokenAddress} is not a wrapped asset (RPC returned null for original address).`);
      } else {
        logger.warn(`[${network}] Unexpected data type for original address for ${tokenAddress}. Expected string or null, got:`, potentialOriginalAddress);
      }
    } else {
      logger.warn(`[${network}] Call to get_original_from_address for ${tokenAddress} was successful but response format was unexpected or empty. Raw response:`, wrappedResponse);
    }
  } catch (rpcError: any) {
    logger.error(`[${network}] RPC call to get_original_from_address for ${tokenAddress} failed. Error: ${rpcError.message}.`);
    // originalCoinTypeFromRpc permanecerá null
  }


  if (!token) { // Si el token no existía en la BD en absoluto
    logger.info(`[${network}] Creating ${metadataSuccess ? 'full' : 'minimal (RPC failed/no data)'} token entry for ${tokenAddress}.`);
    try {
      token = await tx.token.create({
        data: {
          network: network,
          id: tokenAddress,
          name: metadataSuccess ? (tokenDataFromRpc.name ?? null) : null, // Usa ?? null para asegurar que se pase null si es undefined
          symbol: metadataSuccess ? (tokenDataFromRpc.symbol ?? null) : null,
          decimals: metadataSuccess ? (tokenDataFromRpc.decimals ?? null) : null,
          iconUri: metadataSuccess ? (tokenDataFromRpc.icon_uri ?? null) : null,
          projectUri: metadataSuccess ? (tokenDataFromRpc.project_uri ?? null) : null,
          originalCoinType: originalCoinTypeFromRpc,
          metadataFetched: metadataSuccess,
          lastMetadataAttempt: new Date(), // Podrías actualizar esto siempre
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('network_id')) {
        logger.warn(`[${network}] Race condition during token creation for ${tokenAddress}. Fetching existing.`);
        token = await tx.token.findUniqueOrThrow({
          where: { network_id: { network: network, id: tokenAddress } },
        });
        // Si hubo race condition y el otro creó el token con metadatos, el nuestro es obsoleto.
        // O si el otro también falló el RPC, el estado es el mismo.
        // Podríamos re-evaluar si actualizar si `token.metadataFetched` es false y `metadataSuccess` es true aquí.
        // Por simplicidad por ahora, solo lo obtenemos. Tu worker se encargaría de actualizarlo si es necesario.
      } else {
        throw e;
      }
    }
  } else if (token && !token.metadataFetched && metadataSuccess) { // Si existía como "fantasma" y AHORA SÍ obtuvimos metadatos
    logger.info(`[${network}] Updating existing minimal token ${tokenAddress} with fetched metadata.`);
    token = await tx.token.update({
      where: { network_id: { network: network, id: tokenAddress } },
      data: {
        name: tokenDataFromRpc.name ?? token.name, // Usa el valor del RPC, o el existente si el del RPC es null/undefined
        symbol: tokenDataFromRpc.symbol ?? token.symbol,
        decimals: tokenDataFromRpc.decimals ?? token.decimals,
        iconUri: tokenDataFromRpc.icon_uri ?? token.iconUri,
        projectUri: tokenDataFromRpc.project_uri ?? token.projectUri,
        metadataFetched: true,
        lastMetadataAttempt: new Date(),
      },
    });
  } else if (token && !token.metadataFetched && !metadataSuccess) { // Existía como fantasma, RPC falló OTRA VEZ
      logger.warn(`[${network}] RPC for metadata failed again for existing minimal token ${tokenAddress}. No update to metadata fields.`);
      // Opcional: actualizar lastMetadataAttempt si quieres rastrear reintentos fallidos
      if (token.lastMetadataAttempt !== undefined) { // Solo si el campo existe en tu modelo
          token = await tx.token.update({
              where: { network_id: { network: network, id: tokenAddress } },
              data: { lastMetadataAttempt: new Date() }
          });
      }
  }
  // Si el token existía y ya tenía metadataFetched = true, no se hizo nada en este bloque if/else if,
  // y se devuelve el token original.

  return token!; // En todos los caminos, token debería estar definido.
}

async function processPairAMM(event: RpcEvent, tx: TransactionClient) {
  try {
    logger.debug(`[${event.network}] Processing PairCreatedEvent`, event.data);

    // Usar event.network al llamar a getOrCreateToken
    const token0 = await getOrCreateToken(event.data.token0, event.network, tx);
    const token1 = await getOrCreateToken(event.data.token1, event.network, tx);

    await tx.ammpair.create({
      data: {
        pair: event.data.pair,
        creator: event.data.creator,
        network: event.network, // CAMBIADO chainId a network (para el par mismo)
        
        // Conexión a tokens. Prisma usa los campos `fields` de `@relation`
        // Los campos escalares token0Network, token0Address etc. se llenarán automáticamente.
        token0: { connect: { network_id: { id: token0.id, network: token0.network } } }, // CAMBIADO
        token1: { connect: { network_id: { id: token1.id, network: token1.network } } }, // CAMBIADO

        // Ya no necesitas definir explícitamente token0Network, token0Address, etc., si usas `connect`.
        // Si prefieres definirlos explícitamente (y no usar `connect` para el objeto Token completo), sería:
        // token0Network: token0.network,
        // token0Address: token0.id,
        // token1Network: token1.network,
        // token1Address: token1.id,
        // Pero en ese caso, la relación en el select no se establecería con `connect`.
        // Con `connect` es más idiomático en Prisma.
      },
    });
    logger.info(`[${event.network}] Created AMM pair ${event.data.pair} with tokens ${token0.id} (${token0.network}) and ${token1.id} (${token1.network})`);

  } catch (error) {
    logger.error(`[${event.network}] Error processing PairCreatedEvent for pair ${event.data.pair}:`, error);
    throw error;
  }
}

async function handleGameResultEvent(event: RpcEvent, tx: TransactionClient) {
  try {
    logger.debug(`[${event.network}] Processing GameResultEvent`, event.data);
    await tx.gameResult.create({
      data: {
        network: event.network, // CAMBIADO
        nonce: BigInt(event.data.nonce),
        player: event.data.player,
        playerMove: event.data.player_move,
        houseMove: event.data.house_move,
        betAmount: BigInt(event.data.bet_amount),
        outcome: event.data.outcome,
        payoutAmount: BigInt(event.data.payout_amount),
        coinTypeName: event.data.coin_type_name,
        season: BigInt(event.data.season),
        timestamp: BigInt(event.timestamp),
      },
    });
    logger.info(`[${event.network}] Processed GameResultEvent for player ${event.data.player}, nonce ${event.data.nonce}`);
  } catch (error) {
    logger.error(`[${event.network}] Error processing GameResultEvent (Player: ${event.data.player}, Nonce: ${event.data.nonce}):`, error);
    throw error;
  }
}

// Interfaz para los datos del evento, asegúrate que coincida con la estructura real
// (ya la tenías definida como PoolRegisteredEventData, la reusamos)

// En eventProcessor.ts

// Tu función getOrCreateToken existente (la que llama a callViewFunction)
// async function getOrCreateToken(tokenAddress: string, network: string, tx: TransactionClient) { ... }

// Tu función getOrCreateMinimalUser (o una getOrCreateUser completa si la tienes)
// async function getOrCreateMinimalUser(address: string, network: string, tx: TransactionClient) { ... }

// Tu función calculateScaleLogic
// function calculateScaleLogic(decimals: number): string { ... }


async function handleRegisterPoolEvent(event: RpcEvent, tx: TransactionClient) {
  const currentNetwork = event.network;
  // 1. Loguea el objeto 'event.data' completo TAL CUAL lo recibes.
  logger.info(`[${currentNetwork}] Raw event.data for PoolRegisteredEvent:`, JSON.stringify(event.data, null, 2));

  const eventData = event.data as PoolRegisteredEventData; // El casteo a tu interfaz
  
  // 2. Loguea 'eventData' DESPUÉS del casteo para ver si la estructura coincide con tu interfaz.
  logger.info(`[${currentNetwork}] Casted eventData:`, JSON.stringify(eventData, null, 2));

  const { pool_key, is_dynamic, start_timestamp, initial_end_timestamp, initial_reward_per_sec, boost_enabled } = eventData;

  // 3. Loguea 'pool_key' específicamente, ya que es donde están las direcciones.
  logger.info(`[${currentNetwork}] Extracted pool_key:`, JSON.stringify(pool_key, null, 2));

  // Intenta la desestructuración con los nombres que CREEMOS que son correctos (basado en el evento de Move)
  const creator_addr_from_key = pool_key?.creator_addr;
  const stake_addr_from_key = pool_key?.stake_addr; // Usando el nombre corregido
  const reward_addr_from_key = pool_key?.reward_addr; // Usando el nombre corregido

  // 4. Loguea las direcciones individuales extraídas.
  logger.info(`[${currentNetwork}] Creator Addr from pool_key: ${creator_addr_from_key}`);
  logger.info(`[${currentNetwork}] Stake Addr from pool_key: ${stake_addr_from_key}`);
  logger.info(`[${currentNetwork}] Reward Addr from pool_key: ${reward_addr_from_key}`);

  try {
    logger.debug(`[${currentNetwork}] Attempting to process StakingPoolRegisteredEvent with (presumed correct) extracted addresses.`);

    // Aquí usamos las variables logueadas para la validación
    if (!creator_addr_from_key || !stake_addr_from_key || !reward_addr_from_key) {
      logger.error(`[${currentNetwork}] Event ${event.type} missing critical address info AFTER extraction. Pool Key was:`, JSON.stringify(pool_key));
      throw new Error("Critical address information missing for StakingPool (extracted values are null/undefined).");
    }

    // Ahora, cuando llames a getOrCreateToken y tx.stakingPool.create, usa estas variables verificadas:
    const stakeTokenEntity = await getOrCreateToken(stake_addr_from_key, currentNetwork, tx);
    const rewardTokenEntity = await getOrCreateToken(reward_addr_from_key, currentNetwork, tx);
    const creatorUserEntity = await getOrCreateMinimalUser(creator_addr_from_key, currentNetwork, tx);

    let calculatedScale = "0";
    if (stakeTokenEntity.decimals !== null && stakeTokenEntity.decimals !== undefined) {
        calculatedScale = calculateScaleLogic(stakeTokenEntity.decimals);
    } else {
        logger.warn(`[${currentNetwork}] Decimals for stake token ${stakeTokenEntity.id} not available for scale calculation.`);
    }

    try {
      logger.info(`[${currentNetwork}] Attempting to create StakingPool in DB for C:${creator_addr_from_key} S:${stake_addr_from_key} R:${reward_addr_from_key}`);
      await tx.stakingPool.create({
        data: {
          network: currentNetwork,
          creatorAddress: creator_addr_from_key,
          stakeTokenAddress: stake_addr_from_key, // Usando la variable extraída y logueada
          rewardTokenAddress: reward_addr_from_key, // Usando la variable extraída y logueada
          isDynamicPool: is_dynamic,
          startTimestamp: BigInt(start_timestamp),
          initialEndTimestamp: BigInt(initial_end_timestamp),
          initialRewardPerSec: String(initial_reward_per_sec),
          boostEnabled: boost_enabled,
          rewardPerSec: String(initial_reward_per_sec),
          endTimestamp: BigInt(initial_end_timestamp),
          accumReward: "0",
          lastUpdatedTimestamp: BigInt(start_timestamp),
          totalBoosted: "0",
          verified: false,
          emergencyLocked: false,
          stakesClosed: false,
          stakeTokenNetwork: stakeTokenEntity.network, // Estos deberían estar bien si getOrCreateToken funciona
          rewardTokenNetwork: rewardTokenEntity.network,
          creatorNetwork: creatorUserEntity.network,
        },
      });
      logger.info(`[${currentNetwork}] Successfully created StakingPool by ${creator_addr_from_key}.`);
    } catch (createError: any) {
      if (createError.code === 'P2002' && createError.meta?.target?.includes('network_creatorAddress_stakeTokenAddress_rewardTokenAddress')) {
        logger.warn(`[${currentNetwork}] StakingPool for C:${creator_addr_from_key} S:${stake_addr_from_key} R:${reward_addr_from_key} already exists (P2002 caught). Skipping creation.`);
      } else {
        logger.error(`[${currentNetwork}] Error creating StakingPool C:${creator_addr_from_key} S:${stake_addr_from_key} R:${reward_addr_from_key}:`, createError);
        throw createError;
      }
    }
  } catch (error) {
    const creatorForLog = eventData?.pool_key?.creator_addr || 'unknown_creator'; // Acceso más seguro
    logger.error(`[${currentNetwork}] Outer catch in handleRegisterPoolEvent for pool by ${creatorForLog}. Error:`, error);
    throw error;
  }
}
// En eventProcessor.ts

async function getOrCreateMinimalUser(
  address: string,
  network: string,
  tx: TransactionClient
): Promise<import('@prisma/client').User> { // Usar el tipo exacto de Prisma
  if (!address) {
    logger.error(`[${network}] Attempted to get or create minimal user with null or undefined address.`);
    throw new Error(`User address cannot be null or undefined for network ${network}`);
  }

  let user = await tx.user.findUnique({
    where: { network_walletAddress: { network: network, walletAddress: address } },
  });

  if (!user) {
    logger.info(`[${network}] Minimal user entry for ${address} not found. Creating...`);
    try {
      user = await tx.user.create({
        data: {
          network: network,
          walletAddress: address,
          // username, avatarUrl serán null por defecto
          // profileEnriched: false, // Si tienes este campo
        },
      });
      logger.info(`[${network}] Created minimal user entry for ${address}.`);
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('network_walletAddress')) { // Error de unicidad específico
        logger.warn(`[${network}] Race condition: Minimal user ${address} created concurrently. Fetching existing.`);
        user = await tx.user.findUniqueOrThrow({
          where: { network_walletAddress: { network: network, walletAddress: address } },
        });
      } else {
        logger.error(`[${network}] Error creating minimal user ${address}:`, e);
        throw e;
      }
    }
  }
  return user;
}

// Tu función para calcular scale (asegúrate que esté definida y sea correcta)
function calculateScaleLogic(decimals: number): string {
    // Implementa la lógica de:
    // let stake_scale_factor = math128::pow(10, (stake_decimals as u128));
    // let scale = stake_scale_factor * ACCUM_REWARD_SCALE;
    // Devuelve como string para el campo u128.
    // ¡Cuidado con la precisión y los números grandes! Usa una librería de BigNumber o BigInt.
    const ACCUM_REWARD_SCALE_MOVE = BigInt("1000000000000"); // Ejemplo de 10^12, ajusta a tu constante real de Move
    let stakeScaleFactor = BigInt(1);
    for (let i = 0; i < decimals; i++) {
        stakeScaleFactor *= BigInt(10);
    }
    const scale = stakeScaleFactor * ACCUM_REWARD_SCALE_MOVE;
    return scale.toString();
}