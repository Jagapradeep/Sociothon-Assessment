const express = require("express");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const retailers = require("./routes/retailers");
const medicines = require("./routes/medicines");
const app = express();

mongoose
  .connect("mongodb://localhost/hackathon", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Mongo DB"))
  .catch((err) => console.error("Could not connect to Mongo DB ...", err));

app.use(express.json());
app.use("/api/customers", customers);
app.use("/api/retailers", retailers);
app.use("/api/medicines", medicines);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
