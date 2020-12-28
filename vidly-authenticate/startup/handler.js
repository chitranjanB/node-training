module.exports = function () {
  process.on("uncaughtException", function (ex) {
    console.log("Exception caught... Process won't terminate");
    process.exit(1);
  });

  process.on("unhandledRejection", function (ex) {
    console.log("Unhandled rejection", ex);
    process.exit(1);
  });
};
