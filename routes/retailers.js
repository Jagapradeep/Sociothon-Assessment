const express = require("express");
const router = express.Router();
const { Retailer, validate } = require("../models/retailer");

router.get("/", async (req, res) => {
  const retailers = await Retailer.find();
  res.send(retailers);
});

router.get("/:id", async (req, res) => {
  const retailer = await Retailer.findById(req.params.id);
  if (!retailer)
    return res.status(404).send("There is no customer with the specified ID");

  res.send(retailer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const retailer = new Retailer({
    name: req.body.name,
    shopName: req.body.shopName,
    city: req.body.city,
    state: req.body.state,
    address: req.body.address,
    mail: req.body.mail,
    phone: req.body.phone,
  });

  const result = await retailer.save();
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let retailer = await Retailer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      shopName: req.body.shopName,
      city: req.body.city,
      state: req.body.state,
      address: req.body.address,
      mail: req.body.mail,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!retailer)
    return res.status(404).send("There is no customer with the specified ID");

  res.send(retailer);
});

router.delete("/:id", async (req, res) => {
  const retailer = await Retailer.findByIdAndRemove(req.params.id);
  if (!retailer)
    return res.status(404).send("There is no course with the specified ID");

  res.send(retailer);
});

module.exports = router;
