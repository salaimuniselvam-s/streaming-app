const mongoose = require("mongoose");

const planDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const PlanDetails = mongoose.model("planDetailsSchema", planDetailsSchema);

module.exports = { PlanDetails };
