-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_rarityId_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "rarityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_rarityId_fkey" FOREIGN KEY ("rarityId") REFERENCES "Rarity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
