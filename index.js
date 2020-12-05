const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const config = require("config");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));

app.set("view engine", "pug");
app.set("views", "./views");

console.log("Application name is ", config.get("name"));
console.log("Mail server is ", config.get("mail.host"));

console.log("current env is", app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("morgan enabled...");
}
dbDebugger("connected to database...");

app.use(helmet());

app.use(require("./logger"));

app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

let courses = [
  { id: 1, name: "NodeJs Course" },
  { id: 2, name: "React Course" },
];

app.get("/", function (req, res) {
  res.render("index", { title: "pug tutorial", message: "Hello" });
});

app.get("/api/courses", function (req, res) {
  res.send(courses);
});

app.get("/api/courses/:id", function (req, res) {
  const { id } = req.params;

  const course = courses.find((c) => c.id === parseInt(id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send(`No Course exists by id ${id}`);
  }
});

app.post("/api/courses", function (req, res) {
  const result = validateCourse(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const newCourse = { id: courses.length + 1, name: req.body.name };
  courses = [...courses, newCourse];
  res.send(newCourse);
});

app.put("/api/courses/:id", function (req, res) {
  const result = validateCourse(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const courseId = req.params.id;
  let updatedCourse = { id: parseInt(courseId), name: req.body.name };
  const course = courses.find((c) => c.id === parseInt(updatedCourse.id));
  if (!course) {
    return res.status(404).send(`No Course exists by id ${courseId}`);
  }

  courses = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
  console.log("courses after update ", courses);
  res.send(updatedCourse);
});

app.delete("/api/courses/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const course = courses.find((c) => c.id === id);
  if (!course) {
    return res.status(404).send(`No Course exists by id ${id}`);
  }

  courses = courses.filter((c) => c.id !== id);
  console.log(courses);
  res.send("success");
});

app.get("/api/posts/:year/:month", function (req, res) {
  res.send(req.params);
});

app.get("/api/users", function (req, res) {
  res.send(req.query);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(course);
  return result;
}

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
