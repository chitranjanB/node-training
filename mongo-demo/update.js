const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected"));

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

async function updateCourseByRetrieve(id) {
  const course = await Course.findById(id);
  if (course) {
    course.set({
      name: "Mosh",
    });
    let result = await course.save();
    console.log(result);
  }
}

async function updateCourseDirectly(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        name: "NodeJs for beginners",
      },
    }
  );
  console.log(result);
}

// updateCourseByRetrieve("5fcc6629e95c3e1ab4324e3f");
updateCourseDirectly("5fcc6629e95c3e1ab4324e3f");
