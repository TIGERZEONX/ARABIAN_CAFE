const orderService = require("../services/order.service");

const create = async (req, res, next) => {
    try {
        const waiterId = req.user ? req.user._id : req.body.waiterId; // Use auth user or fallback to body
        const order = await orderService.createOrder({
            ...req.body,
            waiterId
        });
        res.status(201).json({ success: true, message: "Order placed successfully", data: order });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

const updateStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        res.status(200).json({ success: true, message: `Order status updated to ${status}`, data: order });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getById,
    updateStatus
};
