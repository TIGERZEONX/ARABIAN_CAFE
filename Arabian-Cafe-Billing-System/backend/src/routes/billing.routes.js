const express = require("express");
const router = express.Router();
const { createBill, getBill, getHistory } = require("../controllers/billing.controller");

router.post("/", createBill);
router.get("/history", getHistory);
router.get("/:id", getBill);

module.exports = router;
