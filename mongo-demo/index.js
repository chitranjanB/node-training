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
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course1.save();
  console.log(result);
}

async function getCourse() {
  console.log("Course.find ", await Course.find());
  console.log("************************************");

  let course = await Course.findOne();
  console.log("Course.findOne ", course);
  console.log("************************************");

  console.log("Course.findById ", await Course.findById(course.id));
  console.log("************************************");

  let complexQueried = await Course.find()
    .limit(2)
    .sort({ date: -1 }) // sort by most recent
    .select({ name: 1, date: 1, _id: 0 }); // select only date and name
  console.log("complex query result", complexQueried);
  console.log("************************************");

  //comparison operator query
  //eq, in, nin gt, lt, gte, lte
  let comparisonQuery = await Course.find({
    date: { $lte: Date.now() },
  });
  console.log("comparison query result", comparisonQuery);
  console.log("************************************");

  //logical query operator
  //or, and
  let logicalQuery = await Course.find()
    .or([{ name: "Angular Course" }, { isPublished: true }])
    .and([{ author: "Mosh" }, { name: "Angular Course" }]);
  console.log("logical query result", logicalQuery);
  console.log("************************************");

  //regex operator starts with
  const regexQuery1 = await Course.find({ author: /^Mosh/ });
  console.log("regex query starts with", regexQuery1);
  console.log("************************************");

  //regex operator ends with
  const regexQuery2 = await Course.find({ author: /Mosh Hamedani$/ });
  console.log("regex query ends with", regexQuery2);
  console.log("************************************");

  //regex operator contains
  const regexQuery3 = await Course.find({ author: /.*Mosh.*/ });
  console.log("regex query contains", regexQuery3);
  console.log("************************************");

  //regex operator case sensitive
  const regexQuery4 = await Course.find({ author: /Mosh/i });
  console.log("regex query case sensitive", regexQuery4);
  console.log("************************************");

  //count
  let count = await Course.find()
    .limit(2)
    .sort({ date: -1 }) // sort by most recent
    .countDocuments(); // select only date and name
  console.log("Count query result", count);
  console.log("************************************");
}

// createCourse();
getCourse();

async function getCoursePage(pageNumber, pageSize) {
  let page = await Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
  console.log("retrieve by page", page);
  console.log("************************************");
}
getCoursePage(1, 10);
