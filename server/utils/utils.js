const { TokenSchema } = require("../model/userModel");
const { hashPassword, comparePassword } = require("./hashPassword");
require("dotenv").config();
const salt = process.env.SAMPLE_SALT;

function saveRefreshToken(refreshToken) {
  const tokenDetails = new TokenSchema({
    refreshToken: hashPassword(refreshToken, salt),
  });

  tokenDetails
    .save()
    .then(() => console.log("Refresh Token saved to database"))
    .catch((error) => {
      console.error(error);
      return res
        .status(406)
        .send("Failed to store Refresh Token into MongoDB Database");
    });
}

async function compareRefreshToken(refreshToken) {
  const hashedPassword = hashPassword(refreshToken, salt);
  const [refreshTokenDetails] = await TokenSchema.find({
    refreshToken: hashedPassword,
  });

  return comparePassword(refreshToken, refreshTokenDetails?.refreshToken || "");
}

async function deleteRefreshToken(refreshToken) {
  await TokenSchema.deleteMany({
    refreshToken: hashPassword(refreshToken, salt),
  });
}

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";

module.exports = {
  saveRefreshToken,
  compareRefreshToken,
  deleteRefreshToken,
  BASE_URL,
};
