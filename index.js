const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json());

let courses = [
  { id: 1, name: "NodeJs Course" },
  { id: 2, name: "React Course" },
];

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/api/courses", function (req, res) {
  res.send([1, 2, 3]);
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
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const newCourse = { id: courses.length + 1, name: req.body.name };
  courses = [...courses, newCourse];
  res.status(201).send(newCourse);
});

app.put("/api/courses/:id", function (req, res) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
  }

  const courseId = req.params.id;
  let updatedCourse = { id: parseInt(courseId), name: req.body.name };
  const course = courses.find((c) => c.id === parseInt(updatedCourse.id));
  if (!course) {
    res.status(404).send(`No Course exists by id ${courseId}`);
    return;
  }

  courses = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
  console.log("courses after update ", courses);
  res.status(200).send(updatedCourse);
});

app.get("/api/posts/:year/:month", function (req, res) {
  res.send(req.params);
});

app.get("/api/users", function (req, res) {
  res.send(req.query);
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
