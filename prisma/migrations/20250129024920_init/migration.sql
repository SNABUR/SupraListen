-- CreateTable
CREATE TABLE "EventTracking" (
    "id" SERIAL NOT NULL,
    "eventType" TEXT NOT NULL,
    "blockHeight" BIGINT NOT NULL,
    "transactionHash" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventTracking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EventTracking_eventType_idx" ON "EventTracking"("eventType");

-- CreateIndex
CREATE INDEX "EventTracking_blockHeight_idx" ON "EventTracking"("blockHeight");

-- CreateIndex
CREATE INDEX "EventTracking_processed_idx" ON "EventTracking"("processed");
