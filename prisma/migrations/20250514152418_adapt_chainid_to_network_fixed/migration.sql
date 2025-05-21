-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_creatorNetwork_creatorAddress_fkey";

-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_stakeTokenNetwork_stakeTokenAddress_fkey";

-- AlterTable
ALTER TABLE "staking_pools" ALTER COLUMN "creatorAddress" DROP NOT NULL,
ALTER COLUMN "stakeTokenAddress" DROP NOT NULL,
ALTER COLUMN "creatorNetwork" DROP NOT NULL,
ALTER COLUMN "rewardTokenNetwork" DROP NOT NULL,
ALTER COLUMN "stakeTokenNetwork" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_stakeTokenNetwork_stakeTokenAddress_fkey" FOREIGN KEY ("stakeTokenNetwork", "stakeTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_creatorNetwork_creatorAddress_fkey" FOREIGN KEY ("creatorNetwork", "creatorAddress") REFERENCES "users"("network", "walletAddress") ON DELETE SET NULL ON UPDATE CASCADE;
