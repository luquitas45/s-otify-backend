const prisma = require("../prisma/prismaClient");
const { validateSong, checkSongExists } = require("../validations/validateSong");

const getSongs = async (page = 1, search = "") => {
  const pageSize = 20;
  const skip = (page - 1) * pageSize;
  const searchTerm = search.trim();
  const where = searchTerm
    ? {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { artist: { contains: searchTerm, mode: "insensitive" } },
        ],
      }
    : {};

  const total = await prisma.song.count({ where });
  const songs = await prisma.song.findMany({
    where,
    skip,
    take: pageSize,
    include: {
      favorites: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

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

  // Verificar si el youtubeId ya existe en otra canción
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
