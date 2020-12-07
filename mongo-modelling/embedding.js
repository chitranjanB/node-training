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
    author: { type: authorSchema, required: true },
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(id) {
  let result = await Course.update(
    { _id: id },
    {
      $set: { "author.name": "John Doe" },
    }
  );
  console.log("result is ", result);
}

//Remove embedded object
async function removeAuthor(id) {
  let result = await Course.update(
    { _id: id },
    {
      $unset: { author: "" }, //validation on name wont help, it will be gone
    }
  );
  console.log("result is ", result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

createCourse("Node Course", new Author({ name: "Chitranjan" }));

// updateAuthor("5fce4268fd068f20e84362c9");

removeAuthor("5fce458d310dff3f540d29f8");
