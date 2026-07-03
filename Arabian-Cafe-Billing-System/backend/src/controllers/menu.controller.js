const menuService = require("../services/menu.service");

const create = async (req, res, next) => {
    try {
        const item = await menuService.createMenuItem(req.body);
        res.status(201).json({ success: true, message: "Menu item created successfully", data: item });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const { categoryId } = req.query;
        const items = await menuService.getAllMenuItems(categoryId);
        res.status(200).json({ success: true, data: items });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const item = await menuService.getMenuItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const item = await menuService.updateMenuItem(req.params.id, req.body);
        if (!item) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        res.status(200).json({ success: true, message: "Menu item updated successfully", data: item });
    } catch (error) {
        next(error);
    }
};

const deleteItem = async (req, res, next) => {
    try {
        const item = await menuService.deleteMenuItem(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        res.status(200).json({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteItem
};
