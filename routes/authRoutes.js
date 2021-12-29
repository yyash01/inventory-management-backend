const User = require("../models/User");
const express = require("express");
const router = express.Router();
const Auth = require("../controllers/authController");

//register the user
router.post("/register", Auth.registerUser);
//login the user
router.post("/login", Auth.loginUser);

module.exports = router;
