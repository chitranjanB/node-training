const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(arg) {
    //just publish the logs, so that it can be handled by subscribers
    this.emit("event", arg);
  }
}

module.exports.Logger = Logger;
