const inventoryService = require("../services/inventory.service");

const getIngredients = async (req, res, next) => {
    try {
        const data = await inventoryService.getAllIngredients();
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

const createIngredient = async (req, res, next) => {
    try {
        const data = await inventoryService.createIngredient(req.body);
        res.status(201).json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

const updateIngredient = async (req, res, next) => {
    try {
        const data = await inventoryService.updateIngredient(req.params.id, req.body);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

const deleteIngredient = async (req, res, next) => {
    try {
        await inventoryService.deleteIngredient(req.params.id);
        res.json({ success: true, message: "Ingredient Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

const getReport = async (req, res, next) => {
    try {
        const data = await inventoryService.getProfitLossReport(req.query);
        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    getReport
};
