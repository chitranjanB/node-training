const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthorWayOne(id) {
  let course = await Course.findById(id);
  course.authors = [new Author({ name: "newly name" })];
  let result = await course.save();
  console.log("result is ", result);
}

async function addAuthor(id) {
  let course = await Course.findById(id);
  course.authors = [...course.authors, new Author({ name: "newly name" })];
  let result = await course.save();
  console.log("result is ", result);
}

//Remove embedded object
async function removeAuthor(courseid, authorid) {
  let course = await Course.findById(courseid);
  course.authors = course.authors.filter((author) => author.id !== authorid);

  let result = await course.save();
  console.log("result is ", result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

// createCourse("Node Course", [
//   new Author({ name: "John" }),
//   new Author({ name: "Babu" }),
// ]);

// updateAuthor("5fce4934a83fd3315835e154");

removeAuthor("5fce4934a83fd3315835e154", "5fce4a255b7e8d32f4d14b7b");
