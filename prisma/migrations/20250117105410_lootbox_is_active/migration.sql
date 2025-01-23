-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "Lootbox_isActive_idx" ON "Lootbox"("isActive");
