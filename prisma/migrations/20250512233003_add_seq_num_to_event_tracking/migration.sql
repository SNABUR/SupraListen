/*
  Warnings:

  - A unique constraint covering the columns `[chainId,transactionHash,sequenceNumber,eventType]` on the table `EventTracking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sequenceNumber` to the `EventTracking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EventTracking_chainId_transactionHash_key";

-- AlterTable
ALTER TABLE "EventTracking" ADD COLUMN     "sequenceNumber" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EventTracking_chainId_transactionHash_sequenceNumber_eventT_key" ON "EventTracking"("chainId", "transactionHash", "sequenceNumber", "eventType");
