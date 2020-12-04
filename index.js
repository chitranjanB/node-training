const { json } = require("body-parser");
const express = require("express");

const app = express();

const courses = [
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
