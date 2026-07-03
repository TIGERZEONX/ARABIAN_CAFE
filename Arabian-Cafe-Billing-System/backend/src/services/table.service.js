const Table = require("../models/Table");

const createTable = async (data) => {
    return await Table.create(data);
};

const getAllTables = async () => {
    return await Table.find().populate("currentOrderId");
};

const updateTableStatus = async (id, status, currentOrderId = null) => {
    return await Table.findByIdAndUpdate(
        id,
        { status, currentOrderId },
        { new: true }
    );
};

const getTableById = async (id) => {
    return await Table.findById(id).populate("currentOrderId");
};

module.exports = {
    createTable,
    getAllTables,
    updateTableStatus,
    getTableById
};
