const prisma = require("../prisma/prismaClient");

const DEFAULT_USER = "anonymous";
const PAGE_SIZE = 20;

const ensureUser = async (userId = DEFAULT_USER) => {
  return prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: userId === DEFAULT_USER ? "anonymous@s-otify.local" : `${userId}@s-otify.local`,
      name: userId === DEFAULT_USER ? "Anonymous" : userId,
      password: "changeme",
    },
  });
};

const checkFavorite = async ({ userId = DEFAULT_USER, songId }) => {
  const favorite = await prisma.favoriteSong.findUnique({
    where: {
      userId_songId: {
        userId,
        songId: parseInt(songId),
      },
    },
  });

  return !!favorite;
};

const addFavorite = async ({ userId = DEFAULT_USER, songId }) => {
  await ensureUser(userId);

  const song = await prisma.song.findUnique({
    where: { id: parseInt(songId) },
  });

  if (!song) {
    const error = new Error("Canción no encontrada");
    error.statusCode = 404;
    throw error;
  }

  const existingFavorite = await prisma.favoriteSong.findUnique({
    where: {
      userId_songId: {
        userId,
        songId: parseInt(songId),
      },
    },
  });

  if (existingFavorite) {
    const error = new Error("Datos inválidos");
    error.statusCode = 409;
    error.details = [{ field: "songId", message: "Esta canción ya está en favoritos" }];
    throw error;
  }

  const favorite = await prisma.favoriteSong.create({
    data: { userId, songId: parseInt(songId) },
    include: { song: true },
  });

  return favorite;
};

const removeFavorite = async ({ userId = DEFAULT_USER, songId }) => {
  const favorite = await prisma.favoriteSong.findUnique({
    where: {
      userId_songId: {
        userId,
        songId: parseInt(songId),
      },
    },
  });

  if (!favorite) {
    const error = new Error("Favorito no encontrado");
    error.statusCode = 404;
    throw error;
  }

  await prisma.favoriteSong.delete({
    where: {
      userId_songId: {
        userId,
        songId: parseInt(songId),
      },
    },
  });

  return { message: "Favorito eliminado" };
};

const getFavorites = async ({ userId = DEFAULT_USER, page = 1 } = {}) => {
  const pageNumber = Math.max(1, parseInt(page) || 1);
  const skip = (pageNumber - 1) * PAGE_SIZE;

  const total = await prisma.favoriteSong.count({
    where: { userId },
  });

  const favorites = await prisma.favoriteSong.findMany({
    where: { userId },
    skip,
    take: PAGE_SIZE,
    include: { song: true },
    orderBy: { createdAt: "desc" },
  });

  return {
    songs: favorites.map((favorite) => favorite.song),
    pagination: {
      page: pageNumber,
      pageSize: PAGE_SIZE,
      total,
      hasMore: skip + PAGE_SIZE < total,
    },
  };
};

module.exports = {
  checkFavorite,
  addFavorite,
  removeFavorite,
  getFavorites,
};
