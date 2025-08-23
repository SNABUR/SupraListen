import { createLogger } from './utils';
import { callViewFunction } from '../../lib/viewFunction/useView';
import { RpcEvent, TransactionClient } from './types';

const logger = createLogger('dbUtils');

const MODULE_PATH_STAKING = `${process.env.NEXT_PUBLIC_STAKING_ADDRESS}::${process.env.NEXT_PUBLIC_STAKING_MODULE}`;

export async function getOrCreateToken(
  tokenAddress: string,
  network: string,
  tx: TransactionClient
): Promise<import('../../prisma/generated/main_db').tokens> {
  if (!tokenAddress) {
    logger.error(`[${network}] Attempted to get or create token with null or undefined address.`);
    throw new Error(`Token address cannot be null or undefined for network ${network}`);
  }

  let token = await tx.tokens.findUnique({
    where: { network_id: { network: network, id: tokenAddress } },
  });

  if (token && token.metadataFetched) {
    logger.debug(`[${network}] Token ${tokenAddress} found with previously fetched metadata.`);
    return token;
  }

  logger.info(`[${network}] Token ${tokenAddress} ${token ? 'exists (minimal/needs update)' : 'not found'}. Fetching/determining metadata...`);

  let metadataSuccess = false;
  let tokenDataFromRpc: any = null;
  let originalCoinTypeFromRpc: string | null = null;
  let determinedMetadataStandard: string | undefined = undefined;

  try {
    if (!tokenAddress.includes("::")) {
        const metadataResponse = await callViewFunction(network, "0x1::fungible_asset", "metadata", ["0x1::object::ObjectCore"], [tokenAddress]);
        if (metadataResponse && metadataResponse.result && metadataResponse.result[0]) {
            tokenDataFromRpc = metadataResponse.result[0];
            if (typeof tokenDataFromRpc.name === 'string' &&
                typeof tokenDataFromRpc.symbol === 'string' &&
                typeof tokenDataFromRpc.decimals === 'number') {
                metadataSuccess = true;
                logger.info(`[${network}] Successfully fetched FA metadata for ${tokenAddress}: Name=${tokenDataFromRpc.name}, Symbol=${tokenDataFromRpc.symbol}, Decimals=${tokenDataFromRpc.decimals}`);
            } else {
                logger.warn(`[${network}] FA metadata for ${tokenAddress} has unexpected structure.`, tokenDataFromRpc);
            }
        } else {
             logger.warn(`[${network}] No FA metadata result for ${tokenAddress}.`, metadataResponse);
        }
    } else {
        logger.info(`[${network}] Token ${tokenAddress} appears to be Coin-Legacy. FA metadata call skipped. Attempting to fetch Coin-Legacy specific info.`);
        if (tokenAddress === `${process.env.NEXT_PUBLIC_SUI_ADDRESS}::supra_coin::SupraCoin` ||
            tokenAddress === `0x1::supra_coin::SupraCoin`) {
            tokenDataFromRpc = { name: "Supra Coin", symbol: "SUPRA", decimals: 8 };
            metadataSuccess = true;
            logger.info(`[${network}] Hardcoded/known metadata for Coin-Legacy ${tokenAddress} applied.`);
        } else {
            logger.warn(`[${network}] No specific metadata fetching logic for Coin-Legacy ${tokenAddress} (besides known ones).`);
        }
    }
  } catch (rpcError: any) {
    logger.error(`[${network}] RPC call to fetch metadata for ${tokenAddress} failed. Error: ${rpcError.message}.`);
  }

  if (!tokenAddress.includes("::")) {
    try {
        const wrappedResponse = await callViewFunction(network, MODULE_PATH_STAKING, "get_metadata", [], [tokenAddress]);
        if (wrappedResponse && wrappedResponse.result && wrappedResponse.result.length > 0) {
            const potentialOriginalAddress = wrappedResponse.result[0];
            if (typeof potentialOriginalAddress === 'string' &&
                potentialOriginalAddress !== tokenAddress &&
                potentialOriginalAddress !== "0x0" &&
                !potentialOriginalAddress.startsWith("0x00000000000000000000000000000000") &&
                potentialOriginalAddress.includes("::")
            ) {
                originalCoinTypeFromRpc = potentialOriginalAddress;
                logger.info(`[${network}] Token ${tokenAddress} (FA) is a wrapper. Original Coin Type (Coin-Legacy): ${originalCoinTypeFromRpc}.`);
            } else if (potentialOriginalAddress === tokenAddress) {
                logger.debug(`[${network}] Token ${tokenAddress} (FA) get_original_from_address returned itself. Not a wrapper of a Coin-Legacy.`);
            } else if (potentialOriginalAddress && typeof potentialOriginalAddress === 'string' && !potentialOriginalAddress.includes("::")) {
                logger.debug(`[${network}] Token ${tokenAddress} (FA) get_original_from_address returned another FA address: ${potentialOriginalAddress}. Not treating as Coin-Legacy wrapper for this logic.`);
            } else {
                logger.debug(`[${network}] get_original_from_address for ${tokenAddress} (FA) returned an unexpected or non-Coin-Legacy type: ${potentialOriginalAddress}.`);
            }
        } else if (wrappedResponse && wrappedResponse.result && wrappedResponse.result[0] === null) {
             logger.info(`[${network}] Token ${tokenAddress} (FA) is not a wrapped asset (RPC get_original_from_address returned null).`);
        } else {
            logger.warn(`[${network}] Unexpected response from get_original_from_address for ${tokenAddress} (FA).`, wrappedResponse);
        }
    } catch (rpcError: any) {
        logger.error(`[${network}] RPC call to get_original_from_address for ${tokenAddress} (FA) failed. Error: ${rpcError.message}.`);
    }
  } else {
      logger.debug(`[${network}] Token ${tokenAddress} is Coin-Legacy, skipping wrapper check (get_original_from_address).`);
  }

  if (tokenAddress.includes("::")) {
    determinedMetadataStandard = "Coin-Legacy";
  } else {
    if (originalCoinTypeFromRpc) {
      determinedMetadataStandard = "Coin-Legacy";
      logger.info(`[${network}] Token ${tokenAddress} (FA wrapper) will be classified as 'Coin-Legacy' because it wraps ${originalCoinTypeFromRpc}.`);
    } else {
      determinedMetadataStandard = "Fungible-Asset";
      logger.info(`[${network}] Token ${tokenAddress} (FA) will be classified as 'Fungible-Asset'.`);
    }
  }
  logger.info(`[${network}] Final classification for ${tokenAddress}: metadataStandard='${determinedMetadataStandard}', originalCoinType='${originalCoinTypeFromRpc || 'N/A'}'.`);

  const dataForDb = {
    name: metadataSuccess && tokenDataFromRpc ? (tokenDataFromRpc.name ?? null) : (token ? token.name : null),
    symbol: metadataSuccess && tokenDataFromRpc ? (tokenDataFromRpc.symbol ?? null) : (token ? token.symbol : null),
    decimals: metadataSuccess && tokenDataFromRpc ? (tokenDataFromRpc.decimals ?? null) : (token ? token.decimals : null),
    iconUri: metadataSuccess && tokenDataFromRpc ? (tokenDataFromRpc.icon_uri ?? null) : (token ? token.iconUri : null),
    projectUri: metadataSuccess && tokenDataFromRpc ? (tokenDataFromRpc.project_uri ?? null) : (token ? token.projectUri : null),
    metadataStandard: determinedMetadataStandard,
    originalCoinType: originalCoinTypeFromRpc,
    metadataFetched: (token?.metadataFetched || metadataSuccess),
    lastMetadataAttempt: new Date(),
  };

  if (!token) {
    logger.info(`[${network}] Creating new token entry for ${tokenAddress} with standard: ${determinedMetadataStandard}.`);
    try {
      token = await tx.tokens.create({
        data: {
          network: network,
          id: tokenAddress,
          ...dataForDb,
          metadataFetched: metadataSuccess,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('network_id')) {
        logger.warn(`[${network}] Race condition: Token ${tokenAddress} created concurrently. Fetching existing.`);
        token = await tx.tokens.findUniqueOrThrow({
          where: { network_id: { network: network, id: tokenAddress } },
        });
      } else {
        logger.error(`[${network}] Error creating token ${tokenAddress}:`, e);
        throw e;
      }
    }
  }
  
  if (token && (
        !token.metadataFetched ||
        (metadataSuccess && (
            token.name !== dataForDb.name ||
            token.symbol !== dataForDb.symbol ||
            token.decimals !== dataForDb.decimals
        )) ||
        token.metadataStandard !== dataForDb.metadataStandard ||
        token.originalCoinType !== dataForDb.originalCoinType
    )) {
    logger.info(`[${network}] Updating existing token ${tokenAddress}. Current fetched: ${token.metadataFetched}, New success: ${metadataSuccess}. Current standard: ${token.metadataStandard}, New standard: ${dataForDb.metadataStandard}. Current original: ${token.originalCoinType}, New original: ${dataForDb.originalCoinType}`);
    token = await tx.tokens.update({
      where: { network_id: { network: network, id: tokenAddress } },
      data: dataForDb,
    });
  } else if (token && !metadataSuccess && !token.metadataFetched) {
      logger.warn(`[${network}] Metadata RPC failed again for existing minimal token ${tokenAddress}. Updating attempt time.`);
      if (token.lastMetadataAttempt !== undefined) {
          token = await tx.tokens.update({
              where: { network_id: { network: network, id: tokenAddress } },
              data: { lastMetadataAttempt: new Date() }
          });
      }
  }

  if (!token) {
    logger.error(`[${network}] CRITICAL: Token object is null for ${tokenAddress} at the end of getOrCreateToken. This should not happen.`);
    throw new Error(`Failed to get or create token ${tokenAddress} on network ${network}.`);
  }

  return token;
}

export async function getOrCreateMinimalUser(
  address: string,
  network: string,
  tx: TransactionClient
): Promise<import('../../prisma/generated/main_db').users> {
  if (!address) {
    logger.error(`[${network}] Attempted to get or create minimal user with null or undefined address.`);
    throw new Error(`User address cannot be null or undefined for network ${network}`);
  }

  let user = await tx.users.findUnique({
    where: { network_walletAddress: { network: network, walletAddress: address } },
  });

  if (!user) {
    logger.info(`[${network}] Minimal user entry for ${address} not found. Creating...`);
    try {
      user = await tx.users.create({
        data: {
          network: network,
          walletAddress: address,
        },
      });
      logger.info(`[${network}] Created minimal user entry for ${address}.`);
    } catch (e: any) {
      if (e.code === 'P2002' && e.meta?.target?.includes('network_walletAddress')) {
        logger.warn(`[${network}] Race condition: Minimal user ${address} created concurrently. Fetching existing.`);
        user = await tx.users.findUniqueOrThrow({
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

export function calculateScaleLogic(decimals: number): string {
    const ACCUM_REWARD_SCALE_MOVE = BigInt("1000000000000");
    let stakeScaleFactor = BigInt(1);
    for (let i = 0; i < decimals; i++) {
        stakeScaleFactor *= BigInt(10);
    }
    const scale = stakeScaleFactor * ACCUM_REWARD_SCALE_MOVE;
    return scale.toString();
}

