const categoryService = require("../services/category.service");

// ======================================
// Create Category
// ======================================
const createCategory = async (req, res, next) => {
    try {

        const category = await categoryService.createCategory(req.body);

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category
        });

    } catch (error) {
        next(error);
    }
};

// ======================================
// Get All Categories
// ======================================
const getAllCategories = async (req, res, next) => {
    try {

        const categories = await categoryService.getAllCategories();

        return res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });

    } catch (error) {
        next(error);
    }
};

// ======================================
// Get Category Tree
// ======================================
const getCategoryTree = async (req, res, next) => {
    try {

        const tree = await categoryService.getCategoryTree();

        return res.status(200).json({
            success: true,
            data: tree
        });

    } catch (error) {
        next(error);
    }
};

// ======================================
// Get Category By Id
// ======================================
const getCategoryById = async (req, res, next) => {
    try {

        const category = await categoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        return res.status(200).json({
            success: true,
            data: category
        });

    } catch (error) {
        next(error);
    }
};

// ======================================
// Update Category
// ======================================
const updateCategory = async (req, res, next) => {
    try {

        const category = await categoryService.updateCategory(
            req.params.id,
            req.body
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully.",
            data: category
        });

    } catch (error) {
        next(error);
    }
};

// ======================================
// Delete Category
// ======================================
const deleteCategory = async (req, res, next) => {
    try {

        await categoryService.deleteCategory(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully."
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryTree,
    getCategoryById,
    updateCategory,
    deleteCategory
};