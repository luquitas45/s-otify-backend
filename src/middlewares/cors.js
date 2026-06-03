const cors = require("cors");
const env = require("../config/env");
const corsMiddleware = cors({
  origin: env.FRONTEND_URL, //Peticiones solo de { FRONTED_URL }
});

module.exports = corsMiddleware;
