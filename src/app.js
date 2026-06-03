const express = require("express");

const corsMiddleware = require("./middlewares/cors");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(corsMiddleware);
app.use(express.json());

app.get("/error", (req, res, next) => {
  next(new Error("Forced error"));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
