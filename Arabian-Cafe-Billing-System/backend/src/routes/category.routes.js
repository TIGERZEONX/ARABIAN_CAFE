const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

// ==========================================
// Get Category Tree
// ==========================================
router.get(
    "/tree",
    authenticate,
    categoryController.getCategoryTree
);

// ==========================================
// Get All Categories
// ==========================================
router.get(
    "/",
    authenticate,
    categoryController.getAllCategories
);

// ==========================================
// Get Category By Id
// ==========================================
router.get(
    "/:id",
    authenticate,
    categoryController.getCategoryById
);

// ==========================================
// Create Category
// ==========================================
router.post(
    "/",
    authenticate,
    authorize("SUPER_ADMIN", "MANAGER"),
    categoryController.createCategory
);

// ==========================================
// Update Category
// ==========================================
router.put(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN", "MANAGER"),
    categoryController.updateCategory
);

// ==========================================
// Delete Category
// ==========================================
router.delete(
    "/:id",
    authenticate,
    authorize("SUPER_ADMIN"),
    categoryController.deleteCategory
);

module.exports = router;