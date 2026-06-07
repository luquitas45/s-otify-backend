-- AlterTable "Song"
ALTER TABLE "Song" ADD COLUMN "image" TEXT NOT NULL,
ADD COLUMN "album" TEXT NOT NULL DEFAULT 'Unknown Album',
ADD COLUMN "duration" TEXT NOT NULL DEFAULT '0:00';

-- AlterTable "FavoriteSong"
ALTER TABLE "FavoriteSong" ADD COLUMN "userId" TEXT NOT NULL DEFAULT 'anonymous';

-- DropIndex
DROP INDEX "FavoriteSong_songId_key";

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteSong_userId_songId_key" ON "FavoriteSong"("userId", "songId");

-- CreateIndex
CREATE INDEX "FavoriteSong_userId_idx" ON "FavoriteSong"("userId");
