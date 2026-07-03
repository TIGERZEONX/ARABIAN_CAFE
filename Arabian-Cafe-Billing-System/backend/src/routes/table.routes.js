const express = require("express");
const router = express.Router();
const { create, getAll, getById, updateStatus } = require("../controllers/table.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.patch("/:id/status", updateStatus);

module.exports = router;
