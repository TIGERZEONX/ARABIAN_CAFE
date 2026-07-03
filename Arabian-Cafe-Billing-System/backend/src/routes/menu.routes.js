const express = require("express");
const router = express.Router();
const { create, getAll, getById, update, deleteItem } = require("../controllers/menu.controller");

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", deleteItem);

module.exports = router;
