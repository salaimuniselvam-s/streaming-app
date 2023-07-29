const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateTokens,
} = require("../middleware/verifyJwtToken");
const { UserDetails } = require("../model/model");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
const { compareRefreshToken, deleteRefreshToken } = require("../utils/utils");
require("dotenv").config();

const refreshSecretToken = process.env.REFRESH_SECRET_TOKEN;
const salt = process.env.SAMPLE_SALT;

/**
 * @description Login to the c stream application
 */
const Login = async (req, res) => {
  // Read username and password from request body
  let { username, password } = req.body;
  let user, role;
  try {
    const [userDetail] = await UserDetails.find({ username: username });
    user =
      comparePassword(
        hashPassword(password, salt),
        userDetail?.password || ""
      ) && userDetail?.username == username;
    role = userDetail?.role;
  } catch (error) {
    return res
      .status(400)
      .send(
        !user
          ? "User Not Found.Please Register"
          : "Username or password  is incorrect!"
      );
  }

  if (user) {
    // Generate an access token
    const { accessToken, refreshToken } = generateTokens(username, role);

    // Once the password is matched a session is created with the username and password
    res.status(200);
    res.json({
      username,
      role,
      accessToken,
      refreshToken,
    });
  } else {
    res.status(401).send("User Not Found.Please Register");
  }
};

// Register Admin
const RegisterAdmin = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json("Passwords do not match");
  }
  try {
    const role = "admin";
    const existingUser = await UserDetails.findOne({ username });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }
    const admin = new UserDetails({
      username,
      password: hashPassword(password, salt),
      role,
    });
    await admin.save();
    const { accessToken, refreshToken } = generateTokens(username, role);
    res.json({
      username,
      role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Registration Failed.Please Try Again..");
  }
};

// Register Customer
const RegisterCustomer = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).json("Passwords do not match");
  }
  try {
    const role = "customer";
    const existingUser = await UserDetails.findOne({ username });
    if (existingUser) {
      return res.status(409).json("User already exists");
    }
    const customer = new UserDetails({
      username,
      password: hashPassword(password, salt),
      role,
    });
    await customer.save();
    const { accessToken, refreshToken } = generateTokens(username, role);
    res.json({
      username,
      role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Registration Failed.Please Try Again..");
  }
};

/**
 * @description Creates a new accessToken when refreshToken is passed in post request
 */
const RefreshToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!compareRefreshToken(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshSecretToken, (err, user) => {
    if (
      err ||
      req.headers.username != user.username ||
      req.headers.role != user.role
    ) {
      return res.sendStatus(403);
    }

    const accessToken = generateAccessToken(
      req.headers.username,
      req.headers.role
    );

    res.json({
      accessToken,
      username: req.headers.username,
      role: req.headers.role,
    });
  });
};

/**
 * @description Logout to remove REFRESH_TOKEN
 */
const Logout = (req, res) => {
  const authHeader = req.headers.authorization;
  deleteRefreshToken(authHeader?.split(" ")[1]);
  res.status(204).send("Successfully Logged out the user");
};

module.exports = {
  Login,
  Logout,
  RefreshToken,
  RegisterAdmin,
  RegisterCustomer,
};
