const express = require("express");
const router = express.Router();

// ==================================
// Authentication
// ==================================
router.use("/auth", require("./auth.routes"));

// ==================================
// User Management
// ==================================
router.use("/users", require("./user.routes"));

// ==================================
// Category Management
// ==================================
router.use("/categories", require("./category.routes"));

// ==================================
// Menu Management
// ==================================
router.use("/menu", require("./menu.routes"));

// ==================================
// Table Seating Management
// ==================================
router.use("/tables", require("./table.routes"));

// ==================================
// Active Orders Management
// ==================================
router.use("/orders", require("./order.routes"));

// ==================================
// Restaurant & Tax Settings
// ==================================
router.use("/settings", require("./setting.routes"));

// ==================================
// Analytics Dashboard
// ==================================
router.use("/dashboard", require("./dashboard.routes"));

router.use("/inventory", require("./inventory.routes"));

module.exports = router;
