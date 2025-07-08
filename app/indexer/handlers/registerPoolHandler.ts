import { RpcEvent, TransactionClient, PoolRegisteredEventData } from '../types';
import { createLogger } from '../utils';
import { getOrCreateToken, getOrCreateMinimalUser, calculateScaleLogic } from '../dbUtils';

const logger = createLogger('registerPoolHandler');

export async function handleRegisterPoolEvent(event: RpcEvent, tx: TransactionClient) {
  const currentNetwork = event.network;
  logger.info(`[${currentNetwork}] Raw event.data for PoolRegisteredEvent:`, JSON.stringify(event.data, null, 2));

  const eventData = event.data as PoolRegisteredEventData;
  
  logger.info(`[${currentNetwork}] Casted eventData:`, JSON.stringify(eventData, null, 2));

  const {
    pool_key,
    is_dynamic,
    start_timestamp,
    initial_end_timestamp,
    initial_reward_per_sec,
    boost_enabled,
    boost_config_collection_owner: owner_obj,
    boost_config_collection_name: name_obj,
    boost_config_percent: percent_obj,
  } = eventData;

  logger.info(`[${currentNetwork}] Extracted pool_key:`, JSON.stringify(pool_key, null, 2));

  const creator_addr_from_key = pool_key?.creator_addr;
  const stake_addr_from_key = pool_key?.stake_addr;
  const reward_addr_from_key = pool_key?.reward_addr;
  const finalBoostOwner = (boost_enabled && owner_obj && owner_obj.vec && owner_obj.vec.length > 0)
    ? owner_obj.vec[0]
    : null;

  const finalBoostName = (boost_enabled && name_obj && name_obj.vec && name_obj.vec.length > 0)
    ? name_obj.vec[0]
    : null;

  const finalBoostPercent = (boost_enabled && percent_obj && percent_obj.vec && percent_obj.vec.length > 0)
    ? String(percent_obj.vec[0])
    : null;

  logger.info(`[${currentNetwork}] Creator Addr from pool_key: ${creator_addr_from_key}`);
  logger.info(`[${currentNetwork}] Stake Addr from pool_key: ${stake_addr_from_key}`);
  logger.info(`[${currentNetwork}] Reward Addr from pool_key: ${reward_addr_from_key}`);
  logger.info(`[${currentNetwork}] Final Boost Owner: ${finalBoostOwner}`);
  logger.info(`[${currentNetwork}] Final Boost Name: ${finalBoostName}`);
  logger.info(`[${currentNetwork}] Final Boost Percent: ${finalBoostPercent}`);

  try {
    logger.debug(`[${currentNetwork}] Attempting to process StakingPoolRegisteredEvent with (presumed correct) extracted addresses.`);

    if (!creator_addr_from_key || !stake_addr_from_key || !reward_addr_from_key) {
      logger.error(`[${currentNetwork}] Event ${event.type} missing critical address info AFTER extraction. Pool Key was:`, JSON.stringify(pool_key));
      throw new Error("Critical address information missing for StakingPool (extracted values are null/undefined).");
    }

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
      await tx.staking_pools.create({
        data: {
          network: currentNetwork,
          creatorAddress: creator_addr_from_key,
          stakeTokenAddress: stake_addr_from_key,
          rewardTokenAddress: reward_addr_from_key,
          isDynamicPool: is_dynamic,
          startTimestamp: BigInt(start_timestamp),
          initialEndTimestamp: BigInt(initial_end_timestamp),
          initialRewardPerSec: String(initial_reward_per_sec),
          boostEnabled: boost_enabled,
          boostConfigCollectionOwner: finalBoostOwner,
          boostConfigCollectionName: finalBoostName,
          boostConfigPercent: finalBoostPercent,
          rewardPerSec: String(initial_reward_per_sec),
          endTimestamp: BigInt(initial_end_timestamp),
          accumReward: "0",
          lastUpdatedTimestamp: BigInt(start_timestamp),
          totalBoosted: "0",
          verified: false,
          emergencyLocked: false,
          stakesClosed: false,
          stakeTokenNetwork: stakeTokenEntity.network,
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
    const creatorForLog = eventData?.pool_key?.creator_addr || 'unknown_creator';
    logger.error(`[${currentNetwork}] Outer catch in handleRegisterPoolEvent for pool by ${creatorForLog}. Error:`, error);
    throw error;
  }
}
