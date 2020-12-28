const express = require("express");
const _ = require("lodash");
const router = express.Router();
const asyncMiddleware = require("../middlewares/asyncMiddleware");
const { User, validateUser } = require("../models/user");

router.post(
  "/",
  asyncMiddleware(async function (req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = new User(_.pick(req.body, ["name", "email", "password"]));
    user = await user.save();
    res.send(user);
  })
);

module.exports = router;
