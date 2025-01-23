/*
  Warnings:

  - A unique constraint covering the columns `[collectionId,tokenName,propertyVersion]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `propertyVersion` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "propertyVersion" BIGINT NOT NULL;

-- CreateIndex
CREATE INDEX "Token_propertyVersion_idx" ON "Token"("propertyVersion");

-- CreateIndex
CREATE UNIQUE INDEX "Token_collectionId_tokenName_propertyVersion_key" ON "Token"("collectionId", "tokenName", "propertyVersion");
