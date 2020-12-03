const path = require("path");
var pathObj = path.parse(__filename);
// console.log(pathObj);

const os = require("os");
// console.log(os.uptime());

const fs = require("fs");
const files = fs.readdirSync("./");
// console.log(files);

fs.readdir("./", function (err, files) {
  if (err) {
    console.log(err);
  } else {
    // console.log("result is ", files);
  }
});
