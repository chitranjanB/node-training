const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customer",
  mongoose.Schema({
    isGold: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, minlength: 4, maxlength: 20 },
    phone: { type: String, required: true, minlength: 5, maxlength: 10 },
  })
);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
