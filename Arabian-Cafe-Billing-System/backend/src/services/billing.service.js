const Bill = require("../models/Bill");
const Order = require("../models/Order");
const Table = require("../models/Table");
const Customer = require("../models/Customer");
const Tax = require("../models/Tax");

// ================================
// Create Bill & Checkout
// ================================
const createBill = async (data) => {
    const { orderId, customerName, customerPhone, paymentMethod, discount = 0, billedBy } = data;

    // 1. Fetch Order
    const order = await Order.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    if (order.paymentStatus === "Paid") {
        throw new Error("Order has already been paid");
    }

    // 2. Fetch Active Tax Settings
    let taxSettings = await Tax.findOne();
    if (!taxSettings) {
        // Fallback default tax parameters if none in database
        taxSettings = { cgstRate: 2.5, sgstRate: 2.5, serviceChargeRate: 0 };
    }

    // 3. Process Customer
    let customer = null;
    if (customerPhone) {
        customer = await Customer.findOne({ phone: customerPhone });
        if (customer) {
            customer.visitCount += 1;
            customer.totalSpent += (order.subTotal - discount);
            await customer.save();
        } else {
            customer = await Customer.create({
                name: customerName || "Guest Customer",
                phone: customerPhone,
                totalSpent: (order.subTotal - discount)
            });
        }
    }

    // 4. Calculate Tax Details
    const taxableAmount = order.subTotal - discount;
    const cgst = Number(((taxableAmount * taxSettings.cgstRate) / 100).toFixed(2));
    const sgst = Number(((taxableAmount * taxSettings.sgstRate) / 100).toFixed(2));
    const serviceCharge = Number(((taxableAmount * taxSettings.serviceChargeRate) / 100).toFixed(2));
    const grandTotal = Number((taxableAmount + cgst + sgst + serviceCharge).toFixed(2));

    // 5. Generate unique Bill Number (e.g. INV-YYYYMMDD-HHMMSS)
    const timestamp = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const billNo = `INV-${timestamp}`;

    // 6. Create Bill
    const bill = await Bill.create({
        billNo,
        orderId,
        customerId: customer ? customer._id : null,
        customerName: customer ? customer.name : (customerName || "Guest"),
        customerPhone: customerPhone || "",
        subTotal: order.subTotal,
        cgst,
        sgst,
        serviceCharge,
        discount,
        grandTotal,
        paymentMethod,
        paymentStatus: "Paid",
        billedBy




    });

    // 7. Update Order & Table status
    order.paymentStatus = "Paid";
    order.status = "Completed";
    await order.save();

    if (order.tableId) {
        await Table.findByIdAndUpdate(order.tableId, {
            status: "Available",
            currentOrderId: null
        });
    }

    // 8. Deduct raw materials stock based on recipes
    try {
        const MenuItem = require("../models/MenuItem");
        const Ingredient = require("../models/Ingredient");

        for (const item of order.items) {
            const menuItem = await MenuItem.findById(item.menuItemId);
            if (menuItem && menuItem.recipe && menuItem.recipe.length > 0) {
                for (const recipeItem of menuItem.recipe) {
                    const quantityToDeduct = recipeItem.quantityRequired * item.quantity;
                    // Decrement stock in database
                    await Ingredient.findByIdAndUpdate(recipeItem.ingredient, {
                        $inc: { stock: -quantityToDeduct }
                    });
                }
            }
        }
    } catch (err) {
        console.error("Error deducting inventory stock:", err);
    }

    return bill;
};




// ================================
// Get Bill Details by ID
// ================================
const getBillById = async (id) => {
    return await Bill.findById(id)
        .populate({
            path: "orderId",
            populate: { path: "items.menuItemId" }
        })
        .populate("billedBy", "fullName");
};

// ================================
// Get Past Bills History
// ================================
const getBillsHistory = async (query = {}) => {
    const { startDate, endDate, phone, search } = query;
    const filter = {};

    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }
    if (phone) {
        filter.customerPhone = phone;
    }
    if (search) {
        filter.$or = [
            { billNo: { $regex: search, $options: "i" } },
            { customerName: { $regex: search, $options: "i" } }
        ];
    }

    return await Bill.find(filter)
        .populate("billedBy", "fullName")
        .sort({ createdAt: -1 });
};

module.exports = {
    createBill,
    getBillById,
    getBillsHistory
};
