const mongoose = require("mongoose");
const validator = require("mongoose-validator");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    min: 10,
    max: 255,
    required: true,
  },
  mail: {
    type: String,
    lowercase: true,
    trim: true,
    validate: [
      validator({
        validator: "isEmail",
        message: "Oops..please enter valid email",
      }),
    ],
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("customer", customerSchema);

function validateCustomer(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().label("Name"),
    address: Joi.string().min(3).max(255).required().label("Address"),
    mail: Joi.string().email().required().label("E-Mail"),
    phone: Joi.number().required().label("Phone"),
  });
  return schema.validate(course);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
