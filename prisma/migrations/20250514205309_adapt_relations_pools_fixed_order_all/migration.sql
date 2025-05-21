-- AlterTable
ALTER TABLE "PoolsDB" ADD COLUMN     "displayOrder" INTEGER;

-- CreateIndex
CREATE INDEX "PoolsDB_network_displayOrder_idx" ON "PoolsDB"("network", "displayOrder");
