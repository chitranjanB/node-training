const express = require("express");
const Joi = require("joi");

const router = express.Router();

let courses = [
  { id: 1, name: "NodeJs Course" },
  { id: 2, name: "React Course" },
];

router.get("/", function (req, res) {
  res.send(courses);
});

router.post("/", function (req, res) {
  const result = validateCourse(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const newCourse = { id: courses.length + 1, name: req.body.name };
  courses = [...courses, newCourse];
  res.send(newCourse);
});

router.get("/:id", function (req, res) {
  const { id } = req.params;

  const course = courses.find((c) => c.id === parseInt(id));
  if (course) {
    res.send(course);
  } else {
    res.status(404).send(`No Course exists by id ${id}`);
  }
});

router.put("/:id", function (req, res) {
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

router.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const course = courses.find((c) => c.id === id);
  if (!course) {
    return res.status(404).send(`No Course exists by id ${id}`);
  }

  courses = courses.filter((c) => c.id !== id);
  console.log(courses);
  res.send("success");
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(course);
}

module.exports = router;
