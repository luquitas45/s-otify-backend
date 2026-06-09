const favoritesService = require("../services/favoritesService");

const checkFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId || "anonymous";
    const isFavorite = await favoritesService.checkFavorite({ userId, songId: id });

    res.status(200).json({
      status: "ok",
      data: {
        songId: parseInt(id),
        isFavorite,
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
    const favorite = await favoritesService.addFavorite({ userId, songId: id });

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
    const result = await favoritesService.removeFavorite({ userId, songId: id });

    res.status(200).json({
      status: "ok",
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const getFavorites = async (req, res, next) => {
  try {
    const userId = req.query.userId || "anonymous";
    const page = req.query.page;
    const result = await favoritesService.getFavorites({ userId, page });

    res.status(200).json({
      status: "ok",
      data: result.songs,
      pagination: result.pagination,
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
