const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("connection failed"));

const CourseSchema = new mongoose.Schema({
  name: String,
  isPublished: Boolean,
  author: String,
  price: Number,
  data: { type: Date, default: Date.now },
  tags: [String],
});
const Course = mongoose.model("Course", CourseSchema);

async function getCourses_sol3() {
  const records = await Course.find({
    isPublished: true,
  })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    .select({ name: 1, author: 1, price: 1, _id: 0 });
  console.log(records);
}

getCourses_sol3();
