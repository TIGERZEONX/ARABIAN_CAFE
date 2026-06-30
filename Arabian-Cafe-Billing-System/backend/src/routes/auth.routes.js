const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth.middleware");

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Profile
router.get(
    "/profile",
    authenticate,
    authController.profile
);

module.exports = router;