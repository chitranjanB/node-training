const express = require("express");
const errorMiddleware = require("../middlewares/error");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const logins = require("../routes/logins");
const register = require("../routes/register");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/logins", logins);
  app.use("/api/register", register);
  app.use(errorMiddleware);
};
