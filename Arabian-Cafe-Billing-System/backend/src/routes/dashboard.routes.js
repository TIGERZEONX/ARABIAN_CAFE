const express = require("express");
const router = express.Router();
const { getStats, getSalesChart } = require("../controllers/dashboard.controller");

router.get("/stats", getStats);
router.get("/sales", getSalesChart);

module.exports = router;
