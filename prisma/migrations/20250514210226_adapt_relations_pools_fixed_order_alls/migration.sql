-- AlterTable
ALTER TABLE "comments" ADD COLUMN     "displayOrder" INTEGER;

-- CreateIndex
CREATE INDEX "comments_poolId_displayOrder_idx" ON "comments"("poolId", "displayOrder");

-- CreateIndex
CREATE INDEX "comments_network_displayOrder_idx" ON "comments"("network", "displayOrder");
