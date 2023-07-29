const express = require("express");
const {
  Login,
  Logout,
  RefreshToken,
  RegisterAdmin,
  RegisterCustomer,
} = require("../controllers/auth.js");
const { UserDetails } = require("../model/model.js");

const router = express.Router();

router.post("/login", Login);
router.post("/register-admin", RegisterAdmin);
router.post("/register-customer", RegisterCustomer);
router.post("/refreshToken", RefreshToken);
router.delete("/logout", Logout);

router.get("/delete-users", async (req, res) => {
  await UserDetails.deleteMany();
  res.send("deleted");
});

module.exports = router;
