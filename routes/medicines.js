const express = require("express");
const router = express.Router();
const { Medicine, validate } = require("../models/medicine");

router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.send(medicines);
});

router.get("/:id", async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine)
    return res.status(404).send("There is no medicine with the specified ID");

  res.send(medicine);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const medicine = new Medicine({
    name: req.body.name,
    rate: req.body.rate,
  });

  const result = await medicine.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let medicine = await Medicine.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      rate: req.body.rate,
    },
    { new: true }
  );

  if (!medicine)
    return res.status(404).send("There is no medicine with the specified ID");

  res.send(medicine);
});

router.delete("/:id", async (req, res) => {
  const medicine = await Medicine.findByIdAndRemove(req.params.id);
  if (!medicine)
    return res.status(404).send("There is no medicine with the specified ID");

  res.send(medicine);
});

module.exports = router;
