const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "pug tutorial", message: "Hello" });
});

module.exports = router;
