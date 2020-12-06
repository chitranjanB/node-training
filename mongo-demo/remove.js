const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected"));

const courseSchema = mongoose.Schema({
  name: String,
  isPublished: Boolean,
  date: { type: Date, default: Date.now },
  author: String,
  tags: [String],
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function remove(id) {
  const course = await Course.findById(id);
  if (course) {
    const result = await course.remove();
    console.log(result);
  }
}

async function removeDirect(id) {
  const course = await Course.remove(id);
  if (course) {
    const result = await course.remove();
    console.log(result);
  }
}

remove("5fcc6629e95c3e1ab4324e3f");
