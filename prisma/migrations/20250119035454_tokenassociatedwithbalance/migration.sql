-- AlterTable
ALTER TABLE "TokenBalance" ADD COLUMN     "tokenId" INTEGER;

-- CreateIndex
CREATE INDEX "TokenBalance_tokenId_idx" ON "TokenBalance"("tokenId");

-- AddForeignKey
ALTER TABLE "TokenBalance" ADD CONSTRAINT "TokenBalance_tokenId_fkey" FOREIGN KEY ("tokenId") REFERENCES "Token"("id") ON DELETE SET NULL ON UPDATE CASCADE;
