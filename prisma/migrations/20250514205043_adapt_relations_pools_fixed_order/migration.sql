-- AlterTable
ALTER TABLE "Ammpair" ADD COLUMN     "displayOrder" INTEGER;

-- AlterTable
ALTER TABLE "staking_pools" ADD COLUMN     "displayOrder" INTEGER;

-- AlterTable
ALTER TABLE "tokens" ADD COLUMN     "displayOrder" INTEGER;

-- CreateIndex
CREATE INDEX "Ammpair_network_displayOrder_idx" ON "Ammpair"("network", "displayOrder");

-- CreateIndex
CREATE INDEX "Ammpair_network_verified_displayOrder_idx" ON "Ammpair"("network", "verified", "displayOrder");

-- CreateIndex
CREATE INDEX "staking_pools_network_displayOrder_idx" ON "staking_pools"("network", "displayOrder");

-- CreateIndex
CREATE INDEX "staking_pools_network_verified_displayOrder_idx" ON "staking_pools"("network", "verified", "displayOrder");

-- CreateIndex
CREATE INDEX "tokens_network_displayOrder_idx" ON "tokens"("network", "displayOrder");

-- CreateIndex
CREATE INDEX "tokens_network_verified_displayOrder_idx" ON "tokens"("network", "verified", "displayOrder");
