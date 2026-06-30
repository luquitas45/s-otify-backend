const env = require("./config/env");
const app = require("./app");

if (process.env.NODE_ENV !== "production") {
  app.listen(env.PORT, () => {
    console.log(`Server levantado en http://localhost:${env.PORT}`);
  });
}

module.exports = app;