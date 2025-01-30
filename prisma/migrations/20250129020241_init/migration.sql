/*
  Warnings:

  - You are about to drop the column `address` on the `PoolsDB` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TradeEvent" DROP CONSTRAINT "TradeEvent_tokenAddress_fkey";

-- DropIndex
DROP INDEX "PoolsDB_address_key";

-- DropIndex
DROP INDEX "PoolsDB_name_symbol_dev_tokenAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_type_accountAddress_tokenAddress_user_timestamp_idx";

-- DropIndex
DROP INDEX "VRFCallback_callerAddress_nonce_timestamp_idx";

-- AlterTable
ALTER TABLE "PoolsDB" DROP COLUMN "address";

-- CreateIndex
CREATE INDEX "PoolsDB_name_idx" ON "PoolsDB"("name");

-- CreateIndex
CREATE INDEX "PoolsDB_symbol_idx" ON "PoolsDB"("symbol");

-- CreateIndex
CREATE INDEX "PoolsDB_dev_idx" ON "PoolsDB"("dev");

-- CreateIndex
CREATE INDEX "PoolsDB_tokenAddress_idx" ON "PoolsDB"("tokenAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_type_idx" ON "TradeEvent"("type");

-- CreateIndex
CREATE INDEX "TradeEvent_accountAddress_idx" ON "TradeEvent"("accountAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_tokenAddress_idx" ON "TradeEvent"("tokenAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_user_idx" ON "TradeEvent"("user");

-- CreateIndex
CREATE INDEX "TradeEvent_timestamp_idx" ON "TradeEvent"("timestamp");

-- CreateIndex
CREATE INDEX "VRFCallback_callerAddress_idx" ON "VRFCallback"("callerAddress");

-- CreateIndex
CREATE INDEX "VRFCallback_nonce_idx" ON "VRFCallback"("nonce");

-- CreateIndex
CREATE INDEX "VRFCallback_timestamp_idx" ON "VRFCallback"("timestamp");
