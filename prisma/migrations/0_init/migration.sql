-- CreateTable "Song"
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "youtubeId" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable "FavoriteSong"
CREATE TABLE "FavoriteSong" (
    "id" SERIAL NOT NULL,
    "songId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FavoriteSong_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Song_youtubeId_key" ON "Song"("youtubeId");

-- CreateIndex
CREATE INDEX "Song_genre_idx" ON "Song"("genre");

-- CreateIndex
CREATE UNIQUE INDEX "FavoriteSong_songId_key" ON "FavoriteSong"("songId");

-- CreateIndex
CREATE INDEX "FavoriteSong_songId_idx" ON "FavoriteSong"("songId");

-- AddForeignKey
ALTER TABLE "FavoriteSong" ADD CONSTRAINT "FavoriteSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE CASCADE ON UPDATE CASCADE;
