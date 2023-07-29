const mongoose = require("mongoose");

// schema for a userDetails
const userDetailsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const tokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
});

const UserDetails = mongoose.model("UserDetails", userDetailsSchema);
const TokenSchema = mongoose.model("Tokens", tokenSchema);

module.exports = { UserDetails, TokenSchema };
