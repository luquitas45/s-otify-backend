const express = require("express");
const route = require("./routes");
const corsMiddleware = require("./middlewares/cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.use("/api", route);


=======<<<<<<< Updated upstream
app.get("/error", (req, res, next) => {
  next(new Error("Forced error"));
});

>>>>>>> Stashed changes
app.use(notFound);
app.use(errorHandler);

module.exports = app;
