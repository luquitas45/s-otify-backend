const prisma = require("../prisma/prismaClient");
const { Prisma } = require("@prisma/client");
const { validateSong, checkSongExists } = require("../validations/validateSong");

const getSongs = async ({ page = 1, search = "", genre = "" } = {}) => {
  const pageSize = 20;
  const skip = (page - 1) * pageSize;

  const searchTerm = search.trim();
  const genreTerm = genre.trim();
  const conditions = [];

  if (searchTerm) {
    const likeSearch = `%${searchTerm}%`;
    conditions.push(
      Prisma.sql`(s."name" ILIKE ${likeSearch} OR s."artist" ILIKE ${likeSearch})`
    );
  }

  if (genreTerm) {
    conditions.push(Prisma.sql`LOWER(s."genre") = LOWER(${genreTerm})`);
  }

  const where = conditions.length
    ? Prisma.sql`WHERE ${Prisma.join(conditions, " AND ")}`
    : Prisma.empty;

  const [result] = await prisma.$queryRaw`
    WITH filtered_songs AS (
      SELECT s.*
      FROM "Song" s
      ${where}
    ),
    paginated_songs AS (
      SELECT *
      FROM filtered_songs
      ORDER BY "createdAt" DESC
      LIMIT ${pageSize} OFFSET ${skip}
    )
    SELECT
      COALESCE(
        json_agg(
          json_build_object(
            'id', ps."id",
            'name', ps."name",
            'artist', ps."artist",
            'genre', ps."genre",
            'youtubeId', ps."youtubeId",
            'image', ps."image",
            'album', ps."album",
            'duration', ps."duration",
            'audioUrl', ps."audioUrl",
            'createdAt', ps."createdAt",
            'updatedAt', ps."updatedAt",
            'favorites', COALESCE(f.favorites, '[]'::json)
          )
          ORDER BY ps."createdAt" DESC
        ) FILTER (WHERE ps."id" IS NOT NULL),
        '[]'::json
      ) AS songs,
      (SELECT COUNT(*)::int FROM filtered_songs) AS total
    FROM paginated_songs ps
    LEFT JOIN LATERAL (
      SELECT json_agg(
        json_build_object(
          'id', fs."id",
          'userId', fs."userId",
          'songId', fs."songId",
          'createdAt', fs."createdAt",
          'updatedAt', fs."updatedAt"
        )
        ORDER BY fs."createdAt" DESC
      ) AS favorites
      FROM "FavoriteSong" fs
      WHERE fs."songId" = ps."id"
    ) f ON true
  `;

  const songs = result?.songs || [];
  const total = Number(result?.total || 0);

  return {
    songs,
    pagination: {
      page,
      pageSize,
      total,
      hasMore: skip + pageSize < total,
    },
  };
};

const getSongById = async (id) => {
  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
    include: {
      favorites: true,
    },
  });

  if (!song) {
    const error = new Error("Canción no encontrada");
    error.statusCode = 404;
    throw error;
  }

  return song;
};

const createSong = async (body) => {
  const errors = validateSong(body);
  if (errors.length > 0) {
    const error = new Error("Datos inválidos");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const { name, artist, genre, youtubeId, audioUrl, image, album, duration } = body;

  const existingSong = await checkSongExists(youtubeId);
  if (existingSong) {
    const error = new Error("Datos inválidos");
    error.statusCode = 400;
    error.details = [{ field: "youtubeId", message: "Esta canción ya existe" }];
    throw error;
  }

  const song = await prisma.song.create({
    data: {
      name,
      artist,
      genre,
      youtubeId,
      audioUrl,
      image,
      album,
      duration,
    },
  });

  return song;
};

const updateSong = async (id, body) => {
  const errors = validateSong(body);
  if (errors.length > 0) {
    const error = new Error("Datos inválidos");
    error.statusCode = 400;
    error.details = errors;
    throw error;
  }

  const { name, artist, genre, youtubeId, audioUrl, image, album, duration } = body;

  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
  });

  if (!song) {
    const error = new Error("Canción no encontrada");
    error.statusCode = 404;
    throw error;
  }

  if (youtubeId !== song.youtubeId) {
    const existingSong = await checkSongExists(youtubeId);
    if (existingSong) {
      const error = new Error("Datos inválidos");
      error.statusCode = 400;
      error.details = [{ field: "youtubeId", message: "Esta canción ya existe" }];
      throw error;
    }
  }

  const updatedSong = await prisma.song.update({
    where: { id: parseInt(id) },
    data: {
      name,
      artist,
      genre,
      youtubeId,
      audioUrl,
      image,
      album,
      duration,
    },
  });

  return updatedSong;
};

const deleteSong = async (id) => {
  const song = await prisma.song.findUnique({
    where: { id: parseInt(id) },
  });

  if (!song) {
    const error = new Error("Canción no encontrada");
    error.statusCode = 404;
    throw error;
  }

  await prisma.song.delete({
    where: { id: parseInt(id) },
  });

  return { message: "Canción eliminada" };
};

module.exports = {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
