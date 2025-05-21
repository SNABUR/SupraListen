/*
  Warnings:

  - You are about to drop the column `token0Id` on the `Ammpair` table. All the data in the column will be lost.
  - You are about to drop the column `token1Id` on the `Ammpair` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[chainId,pair]` on the table `Ammpair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,transactionHash]` on the table `EventTracking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,tokenAddress]` on the table `PoolsDB` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,pool]` on the table `PoolsDB` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,creationNumber,sequenceNumber]` on the table `TradeEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,callerAddress,nonce]` on the table `VRFCallback` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userChainId,userId,commentId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chainId` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token0Address` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token0ChainId` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token1Address` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token1ChainId` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `EventTracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `PoolsDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `TradeEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `VRFCallback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userChainId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userChainId` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chainId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ammpair" DROP CONSTRAINT "Ammpair_token0Id_fkey";

-- DropForeignKey
ALTER TABLE "Ammpair" DROP CONSTRAINT "Ammpair_token1Id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userId_fkey";

-- DropIndex
DROP INDEX "Ammpair_token0Id_idx";

-- DropIndex
DROP INDEX "Ammpair_token1Id_idx";

-- DropIndex
DROP INDEX "EventTracking_blockHeight_idx";

-- DropIndex
DROP INDEX "EventTracking_eventType_idx";

-- DropIndex
DROP INDEX "EventTracking_processed_idx";

-- DropIndex
DROP INDEX "PoolsDB_dev_idx";

-- DropIndex
DROP INDEX "PoolsDB_name_idx";

-- DropIndex
DROP INDEX "PoolsDB_symbol_idx";

-- DropIndex
DROP INDEX "PoolsDB_tokenAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_accountAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_timestamp_idx";

-- DropIndex
DROP INDEX "TradeEvent_tokenAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_type_idx";

-- DropIndex
DROP INDEX "TradeEvent_user_idx";

-- DropIndex
DROP INDEX "VRFCallback_callerAddress_idx";

-- DropIndex
DROP INDEX "VRFCallback_nonce_idx";

-- DropIndex
DROP INDEX "VRFCallback_timestamp_idx";

-- DropIndex
DROP INDEX "comments_createdAt_idx";

-- DropIndex
DROP INDEX "comments_userId_idx";

-- DropIndex
DROP INDEX "likes_userId_commentId_key";

-- DropIndex
DROP INDEX "users_walletAddress_key";

-- AlterTable
ALTER TABLE "Ammpair" DROP COLUMN "token0Id",
DROP COLUMN "token1Id",
ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "token0Address" TEXT NOT NULL,
ADD COLUMN     "token0ChainId" TEXT NOT NULL,
ADD COLUMN     "token1Address" TEXT NOT NULL,
ADD COLUMN     "token1ChainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "EventTracking" ADD COLUMN     "chainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PoolsDB" ADD COLUMN     "chainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TradeEvent" ADD COLUMN     "chainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VRFCallback" ADD COLUMN     "chainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "userChainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "userChainId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "chainId" TEXT NOT NULL,
ADD COLUMN     "nonce" INTEGER,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("chainId", "walletAddress");

-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "tokens" (
    "id" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimals" INTEGER NOT NULL,
    "iconUri" TEXT NOT NULL,
    "projectUri" TEXT NOT NULL,

    CONSTRAINT "tokens_pkey" PRIMARY KEY ("chainId","id")
);

-- CreateTable
CREATE TABLE "GameResult" (
    "id" SERIAL NOT NULL,
    "chainId" TEXT NOT NULL,
    "nonce" BIGINT NOT NULL,
    "player" TEXT NOT NULL,
    "playerMove" INTEGER NOT NULL,
    "houseMove" INTEGER NOT NULL,
    "betAmount" BIGINT NOT NULL,
    "outcome" INTEGER NOT NULL,
    "payoutAmount" BIGINT NOT NULL,
    "coinTypeName" TEXT NOT NULL,
    "season" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staking_pools" (
    "id" SERIAL NOT NULL,
    "chainId" TEXT NOT NULL,
    "creatorAddress" TEXT NOT NULL,
    "stakeTokenAddress" TEXT NOT NULL,
    "rewardTokenAddress" TEXT NOT NULL,
    "isDynamicPool" BOOLEAN NOT NULL,
    "rewardPerSec" TEXT NOT NULL,
    "accumReward" TEXT NOT NULL,
    "lastUpdatedTimestamp" BIGINT NOT NULL,
    "startTimestamp" BIGINT NOT NULL,
    "endTimestamp" BIGINT NOT NULL,
    "scale" TEXT NOT NULL,
    "totalBoosted" TEXT NOT NULL,
    "emergencyLocked" BOOLEAN NOT NULL,
    "stakesClosed" BOOLEAN NOT NULL,
    "stakeTokenChainId" TEXT NOT NULL,
    "rewardTokenChainId" TEXT NOT NULL,
    "creatorChainId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staking_pools_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tokens_chainId_idx" ON "tokens"("chainId");

-- CreateIndex
CREATE INDEX "GameResult_chainId_idx" ON "GameResult"("chainId");

-- CreateIndex
CREATE INDEX "GameResult_chainId_player_idx" ON "GameResult"("chainId", "player");

-- CreateIndex
CREATE INDEX "GameResult_chainId_season_idx" ON "GameResult"("chainId", "season");

-- CreateIndex
CREATE INDEX "GameResult_chainId_timestamp_idx" ON "GameResult"("chainId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_chainId_nonce_key" ON "GameResult"("chainId", "nonce");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_idx" ON "staking_pools"("chainId");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_stakeTokenAddress_idx" ON "staking_pools"("chainId", "stakeTokenAddress");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_rewardTokenAddress_idx" ON "staking_pools"("chainId", "rewardTokenAddress");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_creatorAddress_idx" ON "staking_pools"("chainId", "creatorAddress");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_isDynamicPool_idx" ON "staking_pools"("chainId", "isDynamicPool");

-- CreateIndex
CREATE INDEX "staking_pools_chainId_endTimestamp_idx" ON "staking_pools"("chainId", "endTimestamp");

-- CreateIndex
CREATE UNIQUE INDEX "staking_pools_chainId_creatorAddress_stakeTokenAddress_rewa_key" ON "staking_pools"("chainId", "creatorAddress", "stakeTokenAddress", "rewardTokenAddress");

-- CreateIndex
CREATE INDEX "Ammpair_chainId_idx" ON "Ammpair"("chainId");

-- CreateIndex
CREATE INDEX "Ammpair_token0ChainId_token0Address_idx" ON "Ammpair"("token0ChainId", "token0Address");

-- CreateIndex
CREATE INDEX "Ammpair_token1ChainId_token1Address_idx" ON "Ammpair"("token1ChainId", "token1Address");

-- CreateIndex
CREATE INDEX "Ammpair_chainId_creator_idx" ON "Ammpair"("chainId", "creator");

-- CreateIndex
CREATE UNIQUE INDEX "Ammpair_chainId_pair_key" ON "Ammpair"("chainId", "pair");

-- CreateIndex
CREATE INDEX "EventTracking_chainId_idx" ON "EventTracking"("chainId");

-- CreateIndex
CREATE INDEX "EventTracking_chainId_eventType_idx" ON "EventTracking"("chainId", "eventType");

-- CreateIndex
CREATE INDEX "EventTracking_chainId_blockHeight_idx" ON "EventTracking"("chainId", "blockHeight");

-- CreateIndex
CREATE INDEX "EventTracking_chainId_processed_idx" ON "EventTracking"("chainId", "processed");

-- CreateIndex
CREATE UNIQUE INDEX "EventTracking_chainId_transactionHash_key" ON "EventTracking"("chainId", "transactionHash");

-- CreateIndex
CREATE INDEX "PoolsDB_chainId_idx" ON "PoolsDB"("chainId");

-- CreateIndex
CREATE INDEX "PoolsDB_chainId_name_idx" ON "PoolsDB"("chainId", "name");

-- CreateIndex
CREATE INDEX "PoolsDB_chainId_symbol_idx" ON "PoolsDB"("chainId", "symbol");

-- CreateIndex
CREATE INDEX "PoolsDB_chainId_dev_idx" ON "PoolsDB"("chainId", "dev");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_chainId_tokenAddress_key" ON "PoolsDB"("chainId", "tokenAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_chainId_pool_key" ON "PoolsDB"("chainId", "pool");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_idx" ON "TradeEvent"("chainId");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_type_idx" ON "TradeEvent"("chainId", "type");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_accountAddress_idx" ON "TradeEvent"("chainId", "accountAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_tokenAddress_idx" ON "TradeEvent"("chainId", "tokenAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_user_idx" ON "TradeEvent"("chainId", "user");

-- CreateIndex
CREATE INDEX "TradeEvent_chainId_timestamp_idx" ON "TradeEvent"("chainId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "TradeEvent_chainId_creationNumber_sequenceNumber_key" ON "TradeEvent"("chainId", "creationNumber", "sequenceNumber");

-- CreateIndex
CREATE INDEX "VRFCallback_chainId_idx" ON "VRFCallback"("chainId");

-- CreateIndex
CREATE INDEX "VRFCallback_chainId_callerAddress_idx" ON "VRFCallback"("chainId", "callerAddress");

-- CreateIndex
CREATE INDEX "VRFCallback_chainId_nonce_idx" ON "VRFCallback"("chainId", "nonce");

-- CreateIndex
CREATE INDEX "VRFCallback_chainId_timestamp_idx" ON "VRFCallback"("chainId", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "VRFCallback_chainId_callerAddress_nonce_key" ON "VRFCallback"("chainId", "callerAddress", "nonce");

-- CreateIndex
CREATE INDEX "comments_chainId_idx" ON "comments"("chainId");

-- CreateIndex
CREATE INDEX "comments_userChainId_userId_idx" ON "comments"("userChainId", "userId");

-- CreateIndex
CREATE INDEX "comments_chainId_createdAt_idx" ON "comments"("chainId", "createdAt");

-- CreateIndex
CREATE INDEX "likes_chainId_idx" ON "likes"("chainId");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userChainId_userId_commentId_key" ON "likes"("userChainId", "userId", "commentId");

-- CreateIndex
CREATE INDEX "users_chainId_idx" ON "users"("chainId");

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token0ChainId_token0Address_fkey" FOREIGN KEY ("token0ChainId", "token0Address") REFERENCES "tokens"("chainId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token1ChainId_token1Address_fkey" FOREIGN KEY ("token1ChainId", "token1Address") REFERENCES "tokens"("chainId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userChainId_userId_fkey" FOREIGN KEY ("userChainId", "userId") REFERENCES "users"("chainId", "walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userChainId_userId_fkey" FOREIGN KEY ("userChainId", "userId") REFERENCES "users"("chainId", "walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_stakeTokenChainId_stakeTokenAddress_fkey" FOREIGN KEY ("stakeTokenChainId", "stakeTokenAddress") REFERENCES "tokens"("chainId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_rewardTokenChainId_rewardTokenAddress_fkey" FOREIGN KEY ("rewardTokenChainId", "rewardTokenAddress") REFERENCES "tokens"("chainId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_creatorChainId_creatorAddress_fkey" FOREIGN KEY ("creatorChainId", "creatorAddress") REFERENCES "users"("chainId", "walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
