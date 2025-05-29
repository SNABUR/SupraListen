-- AlterTable
ALTER TABLE "staking_pools" ADD COLUMN     "boostConfigCollectionName" TEXT,
ADD COLUMN     "boostConfigCollectionOwner" TEXT,
ADD COLUMN     "boostConfigPercent" TEXT;

-- CreateIndex
CREATE INDEX "staking_pools_network_boostEnabled_idx" ON "staking_pools"("network", "boostEnabled");

-- CreateIndex
CREATE INDEX "staking_pools_network_boostConfigCollectionOwner_idx" ON "staking_pools"("network", "boostConfigCollectionOwner");
