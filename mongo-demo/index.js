const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) =>
    console.log("Could not establish connection to mongodb", err)
  );

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course1 = new Course({
    name: "NodeJS Course",
    author: "Mosh",
    tags: ["node", "mongo"],
    isPublished: true,
  });

  const result = await course1.save();
  console.log(result);
}

createCourse();
