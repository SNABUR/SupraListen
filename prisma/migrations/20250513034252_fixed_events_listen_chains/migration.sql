/*
  Warnings:

  - A unique constraint covering the columns `[networkName]` on the table `BlockProgress` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chainId,blockHeight,transactionHash,eventType]` on the table `EventTracking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `networkName` to the `BlockProgress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE blockprogress_id_seq;
ALTER TABLE "BlockProgress" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "networkName" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('blockprogress_id_seq');
ALTER SEQUENCE blockprogress_id_seq OWNED BY "BlockProgress"."id";

-- CreateIndex
CREATE UNIQUE INDEX "BlockProgress_networkName_key" ON "BlockProgress"("networkName");

-- CreateIndex
CREATE UNIQUE INDEX "EventTracking_chainId_blockHeight_transactionHash_eventType_key" ON "EventTracking"("chainId", "blockHeight", "transactionHash", "eventType");
