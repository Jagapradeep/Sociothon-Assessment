const mongoose = require("mongoose");
const validator = require("mongoose-validator");
const Joi = require("joi");

const retailerSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  shopName: {
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
  city: {
    type: String,
    trim: true,
    min: 5,
    max: 255,
    required: true,
  },
  state: {
    type: String,
    trim: true,
    min: 5,
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

const retailer = mongoose.model("retailer", retailerSchema);

function validateRetailer(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().label("Name"),
    shopName: Joi.string().min(3).max(255).required().label("Shop Name"),
    address: Joi.string().min(3).max(255).required().label("Address"),
    city: Joi.string().min(3).max(255).required().label("City"),
    state: Joi.string().min(3).max(255).required().label("State"),
    mail: Joi.string().email().required().label("E-Mail"),
    phone: Joi.number().required().label("Phone"),
  });
  return schema.validate(course);
}

exports.Retailer = retailer;
exports.validate = validateRetailer;
