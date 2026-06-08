const cors = require("cors");
const env = require("../config/env");

const allowedOrigins = [env.FRONTEND_URL, "http://localhost:5173"].filter(
  Boolean,
);

const corsMiddleware = cors({
  origin: allowedOrigins,
});

module.exports = corsMiddleware;
