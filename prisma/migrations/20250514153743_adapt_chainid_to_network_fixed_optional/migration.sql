-- DropForeignKey
ALTER TABLE "staking_pools" DROP CONSTRAINT "staking_pools_rewardTokenNetwork_rewardTokenAddress_fkey";

-- AlterTable
ALTER TABLE "staking_pools" ALTER COLUMN "rewardTokenAddress" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "staking_pools" ADD CONSTRAINT "staking_pools_rewardTokenNetwork_rewardTokenAddress_fkey" FOREIGN KEY ("rewardTokenNetwork", "rewardTokenAddress") REFERENCES "tokens"("network", "id") ON DELETE SET NULL ON UPDATE CASCADE;
