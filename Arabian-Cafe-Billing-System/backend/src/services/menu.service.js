const MenuItem = require("../models/MenuItem");

const createMenuItem = async (data) => {
    return await MenuItem.create(data);
};

const getAllMenuItems = async (categoryId = null) => {
    const filter = { isAvailable: true };
    if (categoryId) {
        filter.category = categoryId;
    }
    return await MenuItem.find(filter).populate("category", "name");
};

const getMenuItemById = async (id) => {
    return await MenuItem.findById(id).populate("category");
};

const updateMenuItem = async (id, data) => {
    return await MenuItem.findByIdAndUpdate(id, data, { new: true });
};

const deleteMenuItem = async (id) => {
    return await MenuItem.findByIdAndDelete(id);
};

module.exports = {
    createMenuItem,
    getAllMenuItems,
    getMenuItemById,
    updateMenuItem,
    deleteMenuItem
};
