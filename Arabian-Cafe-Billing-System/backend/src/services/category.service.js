const Category = require("../models/Category");

// ================================
// Create Category
// ================================
const createCategory = async (data) => {

    let level = 0;

    // If parent exists, calculate level
    if (data.parentCategory) {

        const parent = await Category.findById(data.parentCategory);

        if (!parent) {
            throw new Error("Parent Category not found");
        }

        level = parent.level + 1;
    }

    const category = await Category.create({
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        icon: data.icon,
        parentCategory: data.parentCategory || null,
        level,
        displayOrder: data.displayOrder || 0,
        isActive: true
    });

    return category;
};

// ================================
// Get All Categories
// ================================
const getAllCategories = async () => {

    return await Category.find()
        .populate("parentCategory", "name")
        .sort({
            level: 1,
            displayOrder: 1,
            name: 1
        });

};

// ================================
// Get Category By Id
// ================================
const getCategoryById = async (id) => {

    return await Category.findById(id)
        .populate("parentCategory");

};

// ================================
// Update Category
// ================================
const updateCategory = async (id, data) => {

    return await Category.findByIdAndUpdate(
        id,
        data,
        {
            new: true
        }
    );

};

// ================================
// Delete Category
// ================================
const deleteCategory = async (id) => {

    const child = await Category.findOne({
        parentCategory: id
    });

    if (child) {
        throw new Error(
            "Delete child categories first."
        );
    }

    return await Category.findByIdAndDelete(id);

};

// ================================
// Build Category Tree
// ================================
const getCategoryTree = async () => {

    const categories = await Category.find().lean();

    const map = {};

    const roots = [];

    categories.forEach(category => {
        map[category._id] = {
            ...category,
            children: []
        };
    });

    categories.forEach(category => {

        if (category.parentCategory) {

            map[category.parentCategory]?.children.push(
                map[category._id]
            );

        } else {

            roots.push(map[category._id]);

        }

    });

    return roots;
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoryTree
};