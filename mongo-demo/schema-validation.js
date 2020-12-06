const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connected to mongodb"))
  .catch((err) =>
    console.log("Could not establish connection to mongodb", err)
  );

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  author: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile"],
  },
  tags: {
    type: Array,
    required: true,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          //do some async work like access value from db
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      },
      message: "A course should have proper tags",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 100,
    get: (val) => Math.round(val),
    set: (val) => Math.round(val),
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course1 = new Course({
    name: "Angular js",
    author: "Mosh",
    tags: ["frontend"],
    isPublished: true,
    category: "web",
    price: 15.8,
  });

  try {
    const result = await course1.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

createCourse();

async function getCoursePrice(id) {
  const result = await Course.findById(id);
  console.log(result["price"]);
}

getCoursePrice("5fccd05d8334630b40bb9069");
