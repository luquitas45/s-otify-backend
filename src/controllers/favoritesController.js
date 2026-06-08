const prisma = require("../prisma/prismaClient");

const checkFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || "anonymous";

    const favorite = await prisma.favoriteSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: parseInt(id),
        },
      },
    });

    res.status(200).json({
      status: "ok",
      data: {
        songId: parseInt(id),
        isFavorite: !!favorite,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
   const userId = req.body?.userId || req.query.userId || "anonymous";

    const song = await prisma.song.findUnique({
      where: { id: parseInt(id) },
    });

    if (!song) {
      return res.status(404).json({ error: "Canción no encontrada" });
    }

    const existingFavorite = await prisma.favoriteSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: parseInt(id),
        },
      },
    });

    if (existingFavorite) {
      return res.status(409).json({
        error: "Datos inválidos",
        details: [{ field: "songId", message: "Esta canción ya está en favoritos" }],
      });
    }

    const favorite = await prisma.favoriteSong.create({
      data: { userId, songId: parseInt(id) },
      include: { song: true },
    });

    res.status(201).json({
      status: "ok",
      data: favorite,
    });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.body?.userId || req.query.userId || "anonymous";

    const favorite = await prisma.favoriteSong.findUnique({
      where: {
        userId_songId: {
          userId,
          songId: parseInt(id),
        },
      },
    });

    if (!favorite) {
      return res.status(404).json({ error: "Favorito no encontrado" });
    }

    await prisma.favoriteSong.delete({
      where: {
        userId_songId: {
          userId,
          songId: parseInt(id),
        },
      },
    });

    res.status(200).json({
      status: "ok",
      message: "Favorito eliminado",
    });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const userId = req.query.userId || "anonymous";
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = 20;
    const skip = (page - 1) * pageSize;

    const total = await prisma.favoriteSong.count({
      where: { userId },
    });
    const favorites = await prisma.favoriteSong.findMany({
      where: { userId },
      skip,
      take: pageSize,
      include: { song: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({
      status: "ok",
      data: favorites.map((favorite) => favorite.song),
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

module.exports = {
  checkFavorite,
  addFavorite,
  removeFavorite,
  getFavorites,
};
