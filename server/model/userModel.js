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
  // it doesn't to need to be added for admin user
  // later need to have different model for admin
  plan: {
    type: String,
  },
  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  friends: [
    {
      type: String,
    },
  ],
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
