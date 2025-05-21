/*
  Warnings:

  - You are about to drop the column `chainId` on the `Ammpair` table. All the data in the column will be lost.
  - You are about to drop the column `token0ChainId` on the `Ammpair` table. All the data in the column will be lost.
  - You are about to drop the column `token1ChainId` on the `Ammpair` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `GameResult` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userChainId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `userChainId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `likes` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `staking_pools` table. All the data in the column will be lost.
  - You are about to drop the column `creatorChainId` on the `staking_pools` table. All the data in the column will be lost.
  - You are about to drop the column `rewardTokenChainId` on the `staking_pools` table. All the data in the column will be lost.
  - You are about to drop the column `stakeTokenChainId` on the `staking_pools` table. All the data in the column will be lost.
  - The primary key for the `tokens` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chainId` on the `tokens` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chainId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[network,pair]` on the table `Ammpair` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,nonce]` on the table `GameResult` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userNetwork,userWalletAddress,commentId]` on the table `likes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,creatorAddress,stakeTokenAddress,rewardTokenAddress]` on the table `staking_pools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `network` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token0Network` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token1Network` to the `Ammpair` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `GameResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userNetwork` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userWalletAddress` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userNetwork` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userWalletAddress` to the `likes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorNetwork` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rewardTokenNetwork` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stakeTokenNetwork` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ammpair" DROP CONSTRAINT "Ammpair_token0ChainId_token0Address_fkey";

-- DropForeignKey
ALTER TABLE "Ammpair" DROP CONSTRAINT "Ammpair_token1ChainId_token1Address_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userChainId_userId_fkey";

-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_userChainId_userId_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_creatorChainId_creatorAddress_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_rewardTokenChainId_rewardTokenAddress_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_stakeTokenChainId_stakeTokenAddress_fkey";

-- DropIndex
DROP INDEX "Ammpair_chainId_creator_idx";

-- DropIndex
DROP INDEX "Ammpair_chainId_idx";

-- DropIndex
DROP INDEX "Ammpair_chainId_pair_key";

-- DropIndex
DROP INDEX "Ammpair_token0ChainId_token0Address_idx";

-- DropIndex
DROP INDEX "Ammpair_token1ChainId_token1Address_idx";

-- DropIndex
DROP INDEX "GameResult_chainId_idx";

-- DropIndex
DROP INDEX "GameResult_chainId_nonce_key";

-- DropIndex
DROP INDEX "GameResult_chainId_player_idx";

-- DropIndex
DROP INDEX "GameResult_chainId_season_idx";

-- DropIndex
DROP INDEX "GameResult_chainId_timestamp_idx";

-- DropIndex
DROP INDEX "comments_chainId_createdAt_idx";

-- DropIndex
DROP INDEX "comments_chainId_idx";

-- DropIndex
DROP INDEX "comments_userChainId_userId_idx";

-- DropIndex
DROP INDEX "likes_chainId_idx";

-- DropIndex
DROP INDEX "likes_userChainId_userId_commentId_key";

-- DropIndex
DROP INDEX "staking_pools_chainId_creatorAddress_idx";

-- DropIndex
DROP INDEX "staking_pools_chainId_creatorAddress_stakeTokenAddress_rewa_key";

-- DropIndex
DROP INDEX "staking_pools_chainId_endTimestamp_idx";

-- DropIndex
DROP INDEX "staking_pools_chainId_idx";

-- DropIndex
DROP INDEX "staking_pools_chainId_isDynamicPool_idx";

-- DropIndex
DROP INDEX "staking_pools_chainId_rewardTokenAddress_idx";

-- DropIndex
DROP INDEX "staking_pools_chainId_stakeTokenAddress_idx";

-- DropIndex
DROP INDEX "tokens_chainId_idx";

-- DropIndex
DROP INDEX "users_chainId_idx";

-- AlterTable
ALTER TABLE "Ammpair" DROP COLUMN "chainId",
DROP COLUMN "token0ChainId",
DROP COLUMN "token1ChainId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "token0Network" TEXT NOT NULL,
ADD COLUMN     "token1Network" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GameResult" DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "chainId",
DROP COLUMN "userChainId",
DROP COLUMN "userId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "userNetwork" TEXT NOT NULL,
ADD COLUMN     "userWalletAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "likes" DROP COLUMN "chainId",
DROP COLUMN "userChainId",
DROP COLUMN "userId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "userNetwork" TEXT NOT NULL,
ADD COLUMN     "userWalletAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "staking_pools" DROP COLUMN "chainId",
DROP COLUMN "creatorChainId",
DROP COLUMN "rewardTokenChainId",
DROP COLUMN "stakeTokenChainId",
ADD COLUMN     "creatorNetwork" TEXT NOT NULL,
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "rewardTokenNetwork" TEXT NOT NULL,
ADD COLUMN     "stakeTokenNetwork" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_pkey",
DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD CONSTRAINT "tokens_pkey" PRIMARY KEY ("network", "id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("network", "walletAddress");

-- CreateIndex
CREATE INDEX "Ammpair_network_idx" ON "Ammpair"("network");

-- CreateIndex
CREATE INDEX "Ammpair_token0Network_token0Address_idx" ON "Ammpair"("token0Network", "token0Address");

-- CreateIndex
CREATE INDEX "Ammpair_token1Network_token1Address_idx" ON "Ammpair"("token1Network", "token1Address");

-- CreateIndex
CREATE INDEX "Ammpair_network_creator_idx" ON "Ammpair"("network", "creator");

-- CreateIndex
CREATE UNIQUE INDEX "Ammpair_network_pair_key" ON "Ammpair"("network", "pair");

-- CreateIndex
CREATE INDEX "GameResult_network_idx" ON "GameResult"("network");

-- CreateIndex
CREATE INDEX "GameResult_network_player_idx" ON "GameResult"("network", "player");

-- CreateIndex
CREATE INDEX "GameResult_network_season_idx" ON "GameResult"("network", "season");

-- CreateIndex
CREATE INDEX "GameResult_network_timestamp_idx" ON "GameResult"("network", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_network_nonce_key" ON "GameResult"("network", "nonce");

-- CreateIndex
CREATE INDEX "comments_network_idx" ON "comments"("network");

-- CreateIndex
CREATE INDEX "comments_userNetwork_userWalletAddress_idx" ON "comments"("userNetwork", "userWalletAddress");

-- CreateIndex
CREATE INDEX "comments_network_createdAt_idx" ON "comments"("network", "createdAt");

-- CreateIndex
CREATE INDEX "likes_network_idx" ON "likes"("network");

-- CreateIndex
CREATE UNIQUE INDEX "likes_userNetwork_userWalletAddress_commentId_key" ON "likes"("userNetwork", "userWalletAddress", "commentId");

-- CreateIndex
CREATE INDEX "staking_pools_network_idx" ON "staking_pools"("network");

-- CreateIndex
CREATE INDEX "staking_pools_network_stakeTokenAddress_idx" ON "staking_pools"("network", "stakeTokenAddress");

-- CreateIndex
CREATE INDEX "staking_pools_network_rewardTokenAddress_idx" ON "staking_pools"("network", "rewardTokenAddress");

-- CreateIndex
CREATE INDEX "staking_pools_network_creatorAddress_idx" ON "staking_pools"("network", "creatorAddress");

-- CreateIndex
CREATE INDEX "staking_pools_network_isDynamicPool_idx" ON "staking_pools"("network", "isDynamicPool");

-- CreateIndex
CREATE INDEX "staking_pools_network_endTimestamp_idx" ON "staking_pools"("network", "endTimestamp");

-- CreateIndex
CREATE UNIQUE INDEX "staking_pools_network_creatorAddress_stakeTokenAddress_rewa_key" ON "staking_pools"("network", "creatorAddress", "stakeTokenAddress", "rewardTokenAddress");

-- CreateIndex
CREATE INDEX "tokens_network_idx" ON "tokens"("network");

-- CreateIndex
CREATE INDEX "users_network_idx" ON "users"("network");

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token0Network_token0Address_fkey" FOREIGN KEY ("token0Network", "token0Address") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ammpair" ADD CONSTRAINT "Ammpair_token1Network_token1Address_fkey" FOREIGN KEY ("token1Network", "token1Address") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userNetwork_userWalletAddress_fkey" FOREIGN KEY ("userNetwork", "userWalletAddress") REFERENCES "users"("network", "walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userNetwork_userWalletAddress_fkey" FOREIGN KEY ("userNetwork", "userWalletAddress") REFERENCES "users"("network", "walletAddress") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_stakeTokenNetwork_stakeTokenAddress_fkey" FOREIGN KEY ("stakeTokenNetwork", "stakeTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_rewardTokenNetwork_rewardTokenAddress_fkey" FOREIGN KEY ("rewardTokenNetwork", "rewardTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_creatorNetwork_creatorAddress_fkey" FOREIGN KEY ("creatorNetwork", "creatorAddress") REFERENCES "users"("network", "walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
