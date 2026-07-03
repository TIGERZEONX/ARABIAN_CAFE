const Order = require("../models/Order");
const Table = require("../models/Table");

// ================================
// Create Order
// ================================
const createOrder = async (data) => {
    const { orderType, tableId, waiterId, items } = data;

    // 1. Calculate subtotal of order items
    let subTotal = 0;
    const orderItems = items.map(item => {
        let itemPrice = item.price;
        let addonsCost = (item.addons || []).reduce((acc, addon) => acc + addon.price, 0);
        const lineTotal = (itemPrice + addonsCost) * item.quantity;
        subTotal += lineTotal;

        return {
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size || "",
            addons: item.addons || [],
            notes: item.notes || ""
        };
    });

    // 2. Generate short order code (e.g. AC-1001)
    const count = await Order.countDocuments();
    const orderNo = `AC-${1000 + count + 1}`;

    // 3. Create Order document
    const order = await Order.create({
        orderNo,
        orderType,
        tableId: orderType === "Dine-In" ? tableId : null,
        waiterId,
        items: orderItems,
        subTotal,
        status: "Pending",
        paymentStatus: "Unpaid"
    });

    // 4. Update Table state to Occupied if Dine-In
    if (orderType === "Dine-In" && tableId) {
        await Table.findByIdAndUpdate(tableId, {
            status: "Occupied",
            currentOrderId: order._id
        });
    }

    return order;
};

// ================================
// Get Order Details by ID
// ================================
const getOrderById = async (id) => {
    return await Order.findById(id)
        .populate("tableId")
        .populate("waiterId", "fullName");
};

// ================================
// Update Order Status
// ================================
const updateOrderStatus = async (id, status) => {
    const order = await Order.findById(id);
    if (!order) {
        throw new Error("Order not found");
    }

    order.status = status;
    await order.save();

    // If order was cancelled, free up the table
    if (status === "Cancelled" && order.tableId) {
        await Table.findByIdAndUpdate(order.tableId, {
            status: "Available",
            currentOrderId: null
        });
    }

    return order;
};

module.exports = {
    createOrder,
    getOrderById,
    updateOrderStatus
};
