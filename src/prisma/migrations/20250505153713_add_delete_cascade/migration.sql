-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_imageDataId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_leaderboardId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_leaderboardId_fkey" FOREIGN KEY ("leaderboardId") REFERENCES "Leaderboard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_imageDataId_fkey" FOREIGN KEY ("imageDataId") REFERENCES "ImageData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
