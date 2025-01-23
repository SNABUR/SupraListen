-- CreateTable
CREATE TABLE "TokenBurn" (
    "id" SERIAL NOT NULL,
    "tokenId" JSONB NOT NULL,
    "amount" BIGINT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenBurn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TokenBurn_timestamp_idx" ON "TokenBurn"("timestamp");
