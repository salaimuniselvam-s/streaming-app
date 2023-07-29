const express = require("express");
const { getAllPlans } = require("../controllers/admin.js");

const router = express.Router();

router.get("/get-all-plans", getAllPlans);

module.exports = router;
