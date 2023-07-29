const express = require("express");
const {
  Login,
  Logout,
  RefreshToken,
  RegisterAdmin,
  RegisterCustomer,
} = require("../controllers/auth.js");
const { UserDetails } = require("../model/userModel.js");

const router = express.Router();

router.post("/login", Login);
router.post("/register-admin", RegisterAdmin);
router.post("/register-customer", RegisterCustomer);
router.post("/refreshToken", RefreshToken);
router.delete("/logout", Logout);

// for testing purpose - need to delete the route later
router.get("/delete-users", async (req, res) => {
  await UserDetails.deleteMany();
  res.send("deleted");
});

module.exports = router;
