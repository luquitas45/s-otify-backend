const express = require("express");
const { getHealth } = require("../controllers/healthController");
const router = express.Router(); //Aca defino rutas

router.get("/health", getHealth); //Cuando haya un GET a /healt ejecuto getHealth

module.exports = router;
