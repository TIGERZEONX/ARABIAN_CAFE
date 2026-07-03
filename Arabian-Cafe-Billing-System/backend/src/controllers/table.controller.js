const tableService = require("../services/table.service");

const create = async (req, res, next) => {
    try {
        const table = await tableService.createTable(req.body);
        res.status(201).json({ success: true, message: "Table created successfully", data: table });
    } catch (error) {
        next(error);
    }
};

const getAll = async (req, res, next) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json({ success: true, data: tables });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const table = await tableService.getTableById(req.params.id);
        if (!table) {
            return res.status(404).json({ success: false, message: "Table not found" });
        }
        res.status(200).json({ success: true, data: table });
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { status, currentOrderId } = req.body;
        const table = await tableService.updateTableStatus(req.params.id, status, currentOrderId);
        if (!table) {
            return res.status(404).json({ success: false, message: "Table not found" });
        }
        res.status(200).json({ success: true, message: "Table status updated successfully", data: table });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getById,
    updateStatus
};
