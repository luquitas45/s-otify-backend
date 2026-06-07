const prisma = require("../prisma/prismaClient");

const getSongs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const total = await prisma.song.count();
    const songs = await prisma.song.findMany({
      skip,
      take: pageSize,
      include: {
        favorites: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "ok",
      data: songs,
      pagination: {
        page,
        pageSize,
        total,
        hasMore: skip + pageSize < total,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await prisma.song.findUnique({
      where: { id: parseInt(id) },
      include: {
        favorites: true,
      },
    });

    if (!song) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    res.status(200).json({
      status: "ok",
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

const createSong = async (req, res, next) => {
  try {
    const errors = validateSong(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: errors,
      });
    }

    const { name, artist, genre, youtubeId, audioUrl } = req.body;

    const existingSong = await prisma.song.findUnique({
      where: { youtubeId },
    });

    if (existingSong) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: [{ field: "youtubeId", message: "Esta canción ya existe" }],
      });
    }

    const song = await prisma.song.create({
      data: { name, artist, genre, youtubeId, audioUrl },
    });

    res.status(201).json({
      status: "ok",
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const errors = validateSong(req.body);
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: errors,
      });
    }

    const { name, artist, genre, youtubeId, audioUrl } = req.body;

    const song = await prisma.song.findUnique({
      where: { id: parseInt(id) },
    });

    if (!song) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    const updatedSong = await prisma.song.update({
      where: { id: parseInt(id) },
      data: { name, artist, genre, youtubeId, audioUrl },
    });

    res.status(200).json({
      status: "ok",
      data: updatedSong,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await prisma.song.findUnique({
      where: { id: parseInt(id) },
    });

    if (!song) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    await prisma.song.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      status: "ok",
      message: "Canción eliminada",
    });
  } catch (error) {
    next(error);
  }
};

const validateSong = (body) => {
  const errors = [];

  if (!body || typeof body !== "object") {
    errors.push({ field: "body", message: "El body no puede estar vacío" });
    return errors;
  }

  if (!body.name || body.name.toString().trim() === "") {
    errors.push({ field: "name", message: "El nombre es obligatorio" });
  }

  if (!body.artist || body.artist.toString().trim() === "") {
    errors.push({ field: "artist", message: "El artista es obligatorio" });
  }

  if (!body.genre || body.genre.toString().trim() === "") {
    errors.push({ field: "genre", message: "El género es obligatorio" });
  }

  if (!body.youtubeId || body.youtubeId.toString().trim() === "") {
    errors.push({ field: "youtubeId", message: "El ID de YouTube es obligatorio" });
  }

  if (!body.audioUrl || body.audioUrl.toString().trim() === "") {
    errors.push({ field: "audioUrl", message: "La URL de audio es obligatoria" });
  }

  return errors;
};

module.exports = {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
