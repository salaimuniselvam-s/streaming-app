const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  srcUrl: {
    type: String,
    required: true,
  },
  plans: [
    {
      type: String,
      ref: "PlanDetails", // Refers to the "PlanDetails" model
      required: true,
    },
  ],
});

const Movies = mongoose.model("moviesSchema", moviesSchema);

module.exports = { Movies };
