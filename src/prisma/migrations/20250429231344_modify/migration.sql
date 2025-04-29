/*
  Warnings:

  - You are about to drop the column `leaderboardId` on the `ImageData` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageDataId]` on the table `Leaderboard` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageDataId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageData" DROP CONSTRAINT "ImageData_leaderboardId_fkey";

-- DropIndex
DROP INDEX "ImageData_leaderboardId_key";

-- AlterTable
ALTER TABLE "ImageData" DROP COLUMN "leaderboardId";

-- AlterTable
ALTER TABLE "Leaderboard" ADD COLUMN     "imageDataId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Leaderboard_imageDataId_key" ON "Leaderboard"("imageDataId");

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_imageDataId_fkey" FOREIGN KEY ("imageDataId") REFERENCES "ImageData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
