const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use("/", require("./routes/home.js"));
app.use("/api/courses", require("./routes/courses.js"));
app.use("/api/posts", require("./routes/posts.js"));
app.use("/api/users", require("./routes/users.js"));
app.use(require("./middleware/logger"));

console.log("Application name is ", config.get("name"));
console.log("Mail server is ", config.get("mail.host"));
console.log("current env is", app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}
dbDebugger("connected to database...");

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
