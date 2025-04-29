/*
  Warnings:

  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[leaderboardId]` on the table `ImageData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leaderboardId` to the `ImageData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ImageData` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- AlterTable
ALTER TABLE "ImageData" ADD COLUMN     "leaderboardId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId";

-- CreateIndex
CREATE UNIQUE INDEX "ImageData_leaderboardId_key" ON "ImageData"("leaderboardId");

-- AddForeignKey
ALTER TABLE "ImageData" ADD CONSTRAINT "ImageData_leaderboardId_fkey" FOREIGN KEY ("leaderboardId") REFERENCES "Leaderboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
