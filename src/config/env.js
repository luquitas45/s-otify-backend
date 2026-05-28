const dotenv = require("dotenv");
dotenv.config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  NODE_ENV: process.env.NODE_ENV || "development",
};

// Validar que las variables requeridas existan
const required = ["DATABASE_URL"];
const missing = required.filter((key) => !env[key]);

if (missing.length > 0) {
  console.error(
    `❌ Faltan variables de entorno requeridas: ${missing.join(", ")}`
  );
  console.error("   Copiá .env.example a .env y completá los valores.");
  process.exit(1);
}

module.exports = env;
