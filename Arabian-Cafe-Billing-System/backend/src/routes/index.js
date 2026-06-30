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
// TODO: Enable these after creating the files
// ==================================

// router.use("/menu", require("./menu.routes"));
// router.use("/tables", require("./table.routes"));
// router.use("/orders", require("./order.routes"));
// router.use("/bills", require("./bill.routes"));
// router.use("/payments", require("./payment.routes"));
// router.use("/dashboard", require("./dashboard.routes"));
// router.use("/reports", require("./report.routes"));

module.exports = router;