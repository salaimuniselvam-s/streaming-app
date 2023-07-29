const bcrypt = require("bcrypt");
require("dotenv").config();

const salt = process.env.SAMPLE_SALT;

const hashPassword = (password, sampleSalt) => {
  const salt = sampleSalt || bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = (passwordToCheck, password) => {
  return bcrypt.compareSync(passwordToCheck, hashPassword(password, salt));
};

module.exports = { hashPassword, comparePassword };
