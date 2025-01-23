/*
  Warnings:

  - You are about to drop the `CollectionAnalytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CollectionAnalytics";

-- CreateTable
CREATE TABLE "LootboxAnalytics" (
    "id" SERIAL NOT NULL,
    "lootboxId" INTEGER NOT NULL,
    "volume24h" BIGINT NOT NULL DEFAULT 0,
    "purchases24h" INTEGER NOT NULL DEFAULT 0,
    "uniqueBuyers24h" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LootboxAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LootboxAnalytics_lootboxId_key" ON "LootboxAnalytics"("lootboxId");

-- CreateIndex
CREATE INDEX "LootboxAnalytics_volume24h_idx" ON "LootboxAnalytics"("volume24h");

-- CreateIndex
CREATE INDEX "LootboxAnalytics_purchases24h_idx" ON "LootboxAnalytics"("purchases24h");

-- CreateIndex
CREATE INDEX "LootboxAnalytics_uniqueBuyers24h_idx" ON "LootboxAnalytics"("uniqueBuyers24h");

-- AddForeignKey
ALTER TABLE "LootboxAnalytics" ADD CONSTRAINT "LootboxAnalytics_lootboxId_fkey" FOREIGN KEY ("lootboxId") REFERENCES "Lootbox"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
