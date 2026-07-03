const billingService = require("../services/billing.service");

// ================================
// Create Bill & Checkout
// ================================
const createBill = async (req, res, next) => {
    try {
        const billedBy = req.user ? req.user._id : req.body.billedBy; // Use auth user or fallback to body
        if (!billedBy) {
            return res.status(400).json({ success: false, message: "Cashier ID (billedBy) is required" });
        }

        const bill = await billingService.createBill({
            ...req.body,
            billedBy
        });

        res.status(201).json({
            success: true,
            message: "Order checked out and bill generated successfully",
            data: bill
        });
    } catch (error) {
        next(error);
    }
};

// ================================
// Get Single Bill By ID
// ================================
const getBill = async (req, res, next) => {
    try {
        const bill = await billingService.getBillById(req.params.id);
        if (!bill) {
            return res.status(404).json({ success: false, message: "Bill not found" });
        }
        res.status(200).json({ success: true, data: bill });
    } catch (error) {
        next(error);
    }
};

// ================================
// Get Transaction / Invoice History
// ================================
const getHistory = async (req, res, next) => {
    try {
        const history = await billingService.getBillsHistory(req.query);
        res.status(200).json({ success: true, data: history });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createBill,
    getBill,
    getHistory
};
