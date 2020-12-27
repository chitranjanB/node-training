const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const router = express.Router();
const { User, validateLogin } = require("../models/user");

router.post("/", async function (req, res) {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send("invalid email or password");

  const user = await User.findOne(_.pick(req.body, ["email"]));
  if (!user) return res.status(400).send("invalid email or password");

  const isValidPassword = bcrypt.compare(req.body.password, user.password);
  if (!isValidPassword) {
    return res.status(400).send("invalid email or password");
  }
  const token = user.generateAuthToken();
  console.log("token is ", token);
  res.header("x-auth-token", token).send(user);
});

module.exports = router;
