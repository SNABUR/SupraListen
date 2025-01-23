/*
  Warnings:

  - Added the required column `price` to the `LootboxPurchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceCoinType` to the `LootboxPurchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lootbox" ADD COLUMN     "purchaseCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalVolume" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LootboxPurchase" ADD COLUMN     "price" BIGINT NOT NULL,
ADD COLUMN     "priceCoinType" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "TokenBalance" (
    "id" SERIAL NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "tokenDataId" JSONB NOT NULL,
    "balance" BIGINT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenTransaction" (
    "id" SERIAL NOT NULL,
    "accountAddress" TEXT NOT NULL,
    "tokenDataId" JSONB NOT NULL,
    "transactionType" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionAnalytics" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "volume24h" BIGINT NOT NULL DEFAULT 0,
    "purchases24h" INTEGER NOT NULL DEFAULT 0,
    "uniqueBuyers24h" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_LootboxWatchlist" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LootboxWatchlist_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LootboxFollowers" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LootboxFollowers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Account_address_idx" ON "Account"("address");

-- CreateIndex
CREATE INDEX "TokenBalance_accountAddress_idx" ON "TokenBalance"("accountAddress");

-- CreateIndex
CREATE INDEX "TokenBalance_lastUpdated_idx" ON "TokenBalance"("lastUpdated");

-- CreateIndex
CREATE UNIQUE INDEX "TokenBalance_accountAddress_tokenDataId_key" ON "TokenBalance"("accountAddress", "tokenDataId");

-- CreateIndex
CREATE INDEX "TokenTransaction_accountAddress_idx" ON "TokenTransaction"("accountAddress");

-- CreateIndex
CREATE INDEX "TokenTransaction_tokenDataId_idx" ON "TokenTransaction"("tokenDataId");

-- CreateIndex
CREATE INDEX "TokenTransaction_transactionType_idx" ON "TokenTransaction"("transactionType");

-- CreateIndex
CREATE INDEX "TokenTransaction_timestamp_idx" ON "TokenTransaction"("timestamp");

-- CreateIndex
CREATE INDEX "TokenTransaction_createdAt_idx" ON "TokenTransaction"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionAnalytics_collectionId_key" ON "CollectionAnalytics"("collectionId");

-- CreateIndex
CREATE INDEX "CollectionAnalytics_volume24h_idx" ON "CollectionAnalytics"("volume24h");

-- CreateIndex
CREATE INDEX "CollectionAnalytics_purchases24h_idx" ON "CollectionAnalytics"("purchases24h");

-- CreateIndex
CREATE INDEX "CollectionAnalytics_uniqueBuyers24h_idx" ON "CollectionAnalytics"("uniqueBuyers24h");

-- CreateIndex
CREATE INDEX "_LootboxWatchlist_B_index" ON "_LootboxWatchlist"("B");

-- CreateIndex
CREATE INDEX "_LootboxFollowers_B_index" ON "_LootboxFollowers"("B");

-- CreateIndex
CREATE INDEX "Lootbox_totalVolume_idx" ON "Lootbox"("totalVolume");

-- CreateIndex
CREATE INDEX "Lootbox_purchaseCount_idx" ON "Lootbox"("purchaseCount");

-- CreateIndex
CREATE INDEX "LootboxPurchase_createdAt_idx" ON "LootboxPurchase"("createdAt");

-- CreateIndex
CREATE INDEX "LootboxPurchase_price_idx" ON "LootboxPurchase"("price");

-- AddForeignKey
ALTER TABLE "LootboxPurchase" ADD CONSTRAINT "LootboxPurchase_buyerAddress_fkey" FOREIGN KEY ("buyerAddress") REFERENCES "Account"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenBalance" ADD CONSTRAINT "TokenBalance_accountAddress_fkey" FOREIGN KEY ("accountAddress") REFERENCES "Account"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenTransaction" ADD CONSTRAINT "TokenTransaction_accountAddress_fkey" FOREIGN KEY ("accountAddress") REFERENCES "Account"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LootboxWatchlist" ADD CONSTRAINT "_LootboxWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LootboxWatchlist" ADD CONSTRAINT "_LootboxWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Lootbox"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LootboxFollowers" ADD CONSTRAINT "_LootboxFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("address") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LootboxFollowers" ADD CONSTRAINT "_LootboxFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "Lootbox"("id") ON DELETE CASCADE ON UPDATE CASCADE;
