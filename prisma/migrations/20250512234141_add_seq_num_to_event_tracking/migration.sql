/*
  Warnings:

  - You are about to drop the column `sequenceNumber` on the `EventTracking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[chainId,transactionHash,eventType]` on the table `EventTracking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EventTracking_chainId_transactionHash_sequenceNumber_eventT_key";

-- AlterTable
ALTER TABLE "EventTracking" DROP COLUMN "sequenceNumber";

-- CreateIndex
CREATE UNIQUE INDEX "EventTracking_chainId_transactionHash_eventType_key" ON "EventTracking"("chainId", "transactionHash", "eventType");
