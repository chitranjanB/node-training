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

const EventEmitter = require("events");
const emitter = new EventEmitter();

//event declaration should be first in the order
emitter.on("log", function (arg) {
  console.log("event has raised", arg);
});

// event raised
emitter.emit("log", {
  id: 1,
  url: "http://abc.com/log",
  body: { message: "success", timestamp: "12/12/20" },
});
