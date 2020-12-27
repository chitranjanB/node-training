const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(this._id, "privatekey");
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  return Joi.validate(user, schema);
}

function validateLogin(login) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(login, schema);
}

exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;
