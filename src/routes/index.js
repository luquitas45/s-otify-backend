const express = require("express");
const { getHealth } = require("../controllers/healthController");
const { getSongs } = require("../controllers/songsController");
const router = express.Router(); //Aca defino rutas

router.get("/health", getHealth); //Cuando haya un GET a /healt ejecuto getHealth

router.get("/songs", getSongs);

module.exports = router;
