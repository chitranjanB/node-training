var url = "https://logger.io/log";

function log() {
  console.log("logging to cloud");
}

module.exports.log = log;
module.exports.url = url;

module.exports = url;
