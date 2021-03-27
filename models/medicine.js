const mongoose = require("mongoose");
const Joi = require("joi");

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const medicine = mongoose.model("medicine", medicineSchema);

function validateMedicine(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required().label("Name"),
    rate: Joi.number().required().label("Rate"),
  });
  return schema.validate(course);
}

exports.Medicine = medicine;
exports.validate = validateMedicine;
