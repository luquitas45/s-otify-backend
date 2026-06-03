const env = require("./config/env");
const app = require("./app");

app.listen(env.PORT, () => {
  console.log(`Server levantado en ${env.PORT}`);
});
