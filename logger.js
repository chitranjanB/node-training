const EventEmitter = require("events");

let emitter = new EventEmitter();

//event declaration should be first in the order
emitter.on("event", function (arg) {
  console.log("event has raised", arg);
});

function log(arg) {
  console.log(emitter);
  emitter.emit("event", arg);
}

module.exports.log = log;
