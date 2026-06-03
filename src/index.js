const env = require("./config/env");
const app = require("./app");
const route = require("./routes/index");
app.listen(env.PORT, () => {
  console.log(`Server levantado en ${env.PORT}`);
});
