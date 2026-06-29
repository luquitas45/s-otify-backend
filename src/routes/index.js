const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getHealth } = require("../controllers/healthController");
const {
  getSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} = require("../controllers/songsController");
const {
  addFavorite,
  removeFavorite,
  getFavorites,
} = require("../controllers/favoritesController");
const {
  login,
  register,
  logout,
  me,
} = require("../controllers/authController");

const router = express.Router();

router.get("/health", getHealth);

router.get("/songs", getSongs);
router.post("/songs", createSong);
router.get("/songs/:id", getSongById);
router.put("/songs/:id", updateSong);
router.delete("/songs/:id", deleteSong);

router.get("/favorites", authMiddleware, getFavorites);
router.post("/favorites/:id", authMiddleware, addFavorite);
router.delete("/favorites/:id", authMiddleware, removeFavorite);

router.post("/auth/login", login);
router.post("/auth/register", register);
router.post("/auth/logout", logout);
router.get("/auth/me", authMiddleware, me);

module.exports = (app) => {
  app.use("/api", router);
};
