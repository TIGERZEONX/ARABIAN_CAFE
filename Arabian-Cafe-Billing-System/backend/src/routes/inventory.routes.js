const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventory.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

router.use(authenticate);
router.use(authorize("SUPER_ADMIN", "MANAGER"));

router.get("/", controller.getIngredients);
router.post("/", controller.createIngredient);
router.put("/:id", controller.updateIngredient);
router.delete("/:id", controller.deleteIngredient);
router.get("/report/profit-loss", controller.getReport);

module.exports = router;
