/*
  Warnings:

  - You are about to drop the column `chainId` on the `EventTracking` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `PoolsDB` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `TradeEvent` table. All the data in the column will be lost.
  - You are about to drop the column `chainId` on the `VRFCallback` table. All the data in the column will be lost.
  - You are about to drop the `BlockProgress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[network,transactionHash,sequenceNumber,eventType]` on the table `EventTracking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,tokenAddress]` on the table `PoolsDB` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,pool]` on the table `PoolsDB` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,creationNumber,sequenceNumber,type]` on the table `TradeEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,callerAddress,nonce]` on the table `VRFCallback` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `network` to the `EventTracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `PoolsDB` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `TradeEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `network` to the `VRFCallback` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EventTracking_chainId_blockHeight_idx";

-- DropIndex
DROP INDEX "EventTracking_chainId_blockHeight_transactionHash_eventType_key";

-- DropIndex
DROP INDEX "EventTracking_chainId_eventType_idx";

-- DropIndex
DROP INDEX "EventTracking_chainId_idx";

-- DropIndex
DROP INDEX "EventTracking_chainId_processed_idx";

-- DropIndex
DROP INDEX "PoolsDB_chainId_dev_idx";

-- DropIndex
DROP INDEX "PoolsDB_chainId_idx";

-- DropIndex
DROP INDEX "PoolsDB_chainId_name_idx";

-- DropIndex
DROP INDEX "PoolsDB_chainId_pool_key";

-- DropIndex
DROP INDEX "PoolsDB_chainId_symbol_idx";

-- DropIndex
DROP INDEX "PoolsDB_chainId_tokenAddress_key";

-- DropIndex
DROP INDEX "TradeEvent_chainId_accountAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_chainId_creationNumber_sequenceNumber_key";

-- DropIndex
DROP INDEX "TradeEvent_chainId_idx";

-- DropIndex
DROP INDEX "TradeEvent_chainId_timestamp_idx";

-- DropIndex
DROP INDEX "TradeEvent_chainId_tokenAddress_idx";

-- DropIndex
DROP INDEX "TradeEvent_chainId_type_idx";

-- DropIndex
DROP INDEX "TradeEvent_chainId_user_idx";

-- DropIndex
DROP INDEX "VRFCallback_chainId_callerAddress_idx";

-- DropIndex
DROP INDEX "VRFCallback_chainId_callerAddress_nonce_key";

-- DropIndex
DROP INDEX "VRFCallback_chainId_idx";

-- DropIndex
DROP INDEX "VRFCallback_chainId_nonce_idx";

-- DropIndex
DROP INDEX "VRFCallback_chainId_timestamp_idx";

-- AlterTable
ALTER TABLE "EventTracking" DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL,
ADD COLUMN     "sequenceNumber" TEXT;

-- AlterTable
ALTER TABLE "PoolsDB" DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TradeEvent" DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VRFCallback" DROP COLUMN "chainId",
ADD COLUMN     "network" TEXT NOT NULL;

-- DropTable
DROP TABLE "BlockProgress";

-- CreateTable
CREATE TABLE "block_progress" (
    "network" TEXT NOT NULL,
    "lastBlockHeight" BIGINT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "block_progress_pkey" PRIMARY KEY ("network")
);

-- CreateIndex
CREATE INDEX "EventTracking_network_idx" ON "EventTracking"("network");

-- CreateIndex
CREATE INDEX "EventTracking_network_eventType_idx" ON "EventTracking"("network", "eventType");

-- CreateIndex
CREATE INDEX "EventTracking_network_blockHeight_idx" ON "EventTracking"("network", "blockHeight");

-- CreateIndex
CREATE INDEX "EventTracking_network_processed_idx" ON "EventTracking"("network", "processed");

-- CreateIndex
CREATE UNIQUE INDEX "EventTracking_network_transactionHash_sequenceNumber_eventT_key" ON "EventTracking"("network", "transactionHash", "sequenceNumber", "eventType");

-- CreateIndex
CREATE INDEX "PoolsDB_network_idx" ON "PoolsDB"("network");

-- CreateIndex
CREATE INDEX "PoolsDB_network_name_idx" ON "PoolsDB"("network", "name");

-- CreateIndex
CREATE INDEX "PoolsDB_network_symbol_idx" ON "PoolsDB"("network", "symbol");

-- CreateIndex
CREATE INDEX "PoolsDB_network_dev_idx" ON "PoolsDB"("network", "dev");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_network_tokenAddress_key" ON "PoolsDB"("network", "tokenAddress");

-- CreateIndex
CREATE UNIQUE INDEX "PoolsDB_network_pool_key" ON "PoolsDB"("network", "pool");

-- CreateIndex
CREATE INDEX "TradeEvent_network_idx" ON "TradeEvent"("network");

-- CreateIndex
CREATE INDEX "TradeEvent_network_type_idx" ON "TradeEvent"("network", "type");

-- CreateIndex
CREATE INDEX "TradeEvent_network_accountAddress_idx" ON "TradeEvent"("network", "accountAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_network_tokenAddress_idx" ON "TradeEvent"("network", "tokenAddress");

-- CreateIndex
CREATE INDEX "TradeEvent_network_user_idx" ON "TradeEvent"("network", "user");

-- CreateIndex
CREATE INDEX "TradeEvent_network_timestamp_idx" ON "TradeEvent"("network", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "TradeEvent_network_creationNumber_sequenceNumber_type_key" ON "TradeEvent"("network", "creationNumber", "sequenceNumber", "type");

-- CreateIndex
CREATE INDEX "VRFCallback_network_idx" ON "VRFCallback"("network");

-- CreateIndex
CREATE INDEX "VRFCallback_network_callerAddress_idx" ON "VRFCallback"("network", "callerAddress");

-- CreateIndex
CREATE INDEX "VRFCallback_network_nonce_idx" ON "VRFCallback"("network", "nonce");

-- CreateIndex
CREATE INDEX "VRFCallback_network_timestamp_idx" ON "VRFCallback"("network", "timestamp");

-- CreateIndex
CREATE UNIQUE INDEX "VRFCallback_network_callerAddress_nonce_key" ON "VRFCallback"("network", "callerAddress", "nonce");
