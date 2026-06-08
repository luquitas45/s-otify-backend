const songsService = require("../services/songsService");

const getSongs = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const result = await songsService.getSongs(page);

    res.status(200).json({
      status: "ok",
      data: result.songs,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await songsService.getSongById(id);

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
    const song = await songsService.createSong(req.body);

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
    const song = await songsService.updateSong(id, req.body);

    res.status(200).json({
      status: "ok",
      data: song,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await songsService.deleteSong(id);

    res.status(200).json({
      status: "ok",
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
};
