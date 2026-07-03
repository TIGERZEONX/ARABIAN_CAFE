const express = require("express");
const router = express.Router();
const { create, getById, updateStatus } = require("../controllers/order.controller");

router.post("/", create);
router.get("/:id", getById);
router.patch("/:id/status", updateStatus);

module.exports = router;
