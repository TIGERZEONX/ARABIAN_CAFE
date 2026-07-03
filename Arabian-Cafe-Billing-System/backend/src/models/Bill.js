const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  billNo: { type: String, required: true, unique: true }, // e.g., INV-20260703-001
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", default: null },
  customerName: { type: String },
  customerPhone: { type: String },
  subTotal: { type: Number, required: true },
  cgst: { type: Number, default: 0 }, // Central GST
  sgst: { type: Number, default: 0 }, // State GST
  serviceCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Cash", "Card", "UPI", "Split"], default: "Cash" },
  paymentStatus: { type: String, enum: ["Paid", "Refunded"], default: "Paid" },
  billedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Bill", billSchema);
