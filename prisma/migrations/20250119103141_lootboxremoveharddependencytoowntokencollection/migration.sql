-- DropForeignKey
ALTER TABLE "Lootbox" DROP CONSTRAINT "Lootbox_tokenCollectionId_fkey";

-- AlterTable
ALTER TABLE "Lootbox" ALTER COLUMN "tokenCollectionId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lootbox" ADD CONSTRAINT "Lootbox_tokenCollectionId_fkey" FOREIGN KEY ("tokenCollectionId") REFERENCES "TokenCollection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
