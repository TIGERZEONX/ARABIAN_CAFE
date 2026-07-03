const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true }, // Auto-generated reference e.g. AC-1001
  orderType: { type: String, enum: ["Dine-In", "Takeaway", "Delivery"], required: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: "Table", default: null },
  waiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  items: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    size: { type: String }, // e.g., 'Regular', 'Large'
    addons: [{
      name: { type: String },
      price: { type: Number }
    }],
    notes: { type: String, default: "" }
  }],
  subTotal: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Pending", "Preparing", "Served", "Completed", "Cancelled"],
    default: "Pending"
  },
  paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
