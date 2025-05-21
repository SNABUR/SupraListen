/*
  Warnings:

  - Added the required column `boostEnabled` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialEndTimestamp` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `initialRewardPerSec` to the `staking_pools` table without a default value. This is not possible if the table is not empty.
  - Made the column `creatorAddress` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stakeTokenAddress` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewardTokenAddress` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorNetwork` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rewardTokenNetwork` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.
  - Made the column `stakeTokenNetwork` on table `staking_pools` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_creatorNetwork_creatorAddress_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_rewardTokenNetwork_rewardTokenAddress_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_stakeTokenNetwork_stakeTokenAddress_fkey";

-- DropIndex
DROP INDEX "staking_pools_network_creatorAddress_idx";

-- DropIndex
DROP INDEX "staking_pools_network_endTimestamp_idx";

-- DropIndex
DROP INDEX "staking_pools_network_idx";

-- DropIndex
DROP INDEX "staking_pools_network_isDynamicPool_idx";

-- DropIndex
DROP INDEX "staking_pools_network_rewardTokenAddress_idx";

-- DropIndex
DROP INDEX "staking_pools_network_stakeTokenAddress_idx";

-- DropIndex
DROP INDEX "tokens_network_idx";

-- DropIndex
DROP INDEX "users_network_idx";

-- AlterTable
ALTER TABLE "staking_pools" ADD COLUMN     "boostEnabled" BOOLEAN NOT NULL,
ADD COLUMN     "initialEndTimestamp" BIGINT NOT NULL,
ADD COLUMN     "initialRewardPerSec" TEXT NOT NULL,
ALTER COLUMN "creatorAddress" SET NOT NULL,
ALTER COLUMN "stakeTokenAddress" SET NOT NULL,
ALTER COLUMN "rewardTokenAddress" SET NOT NULL,
ALTER COLUMN "accumReward" SET DEFAULT '0',
ALTER COLUMN "totalBoosted" SET DEFAULT '0',
ALTER COLUMN "emergencyLocked" SET DEFAULT false,
ALTER COLUMN "stakesClosed" SET DEFAULT false,
ALTER COLUMN "creatorNetwork" SET NOT NULL,
ALTER COLUMN "rewardTokenNetwork" SET NOT NULL,
ALTER COLUMN "stakeTokenNetwork" SET NOT NULL;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "lastMetadataAttempt" TIMESTAMP(3),
ADD COLUMN     "metadataFetched" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "metadataStandard" TEXT,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "symbol" DROP NOT NULL,
ALTER COLUMN "decimals" DROP NOT NULL,
ALTER COLUMN "iconUri" DROP NOT NULL,
ALTER COLUMN "projectUri" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "tokens_network_metadataFetched_idx" ON "tokens"("network", "metadataFetched");

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_stakeTokenNetwork_stakeTokenAddress_fkey" FOREIGN KEY ("stakeTokenNetwork", "stakeTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_rewardTokenNetwork_rewardTokenAddress_fkey" FOREIGN KEY ("rewardTokenNetwork", "rewardTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_creatorNetwork_creatorAddress_fkey" FOREIGN KEY ("creatorNetwork", "creatorAddress") REFERENCES "users"("network", "walletAddress") ON DELETE RESTRICT ON UPDATE CASCADE;
