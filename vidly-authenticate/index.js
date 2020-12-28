const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const logins = require("./routes/logins");
const register = require("./routes/register");
const errorMiddleware = require("./middlewares/error");
const express = require("express");
const app = express();

process.on("uncaughtException", function (ex) {
  console.log("Exception caught... Process won't terminate");
});

process.on("unhandledRejection", function (ex) {
  console.log("Unhandled rejection", ex);
});

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

//throw new Error("Simulate uncaught error while startup");
//This will be only catched if you have unhandledRejection event handler on process
async function rejecting() {
  const p = await Promise.reject(new Error("unhandled promise"));
}
rejecting();

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/logins", logins);
app.use("/api/register", register);

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
