const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  cafeName: { type: String, required: true, default: "Arabian Cafe" },
  address: { type: String, default: "" },
  phone: { type: String, default: "" },
  gstNumber: { type: String, default: "" },
  cgstRate: { type: Number, default: 2.5 }, // %
  sgstRate: { type: Number, default: 2.5 }, // %
  serviceChargeRate: { type: Number, default: 0 }, // %
  receiptHeader: { type: String, default: "Welcome to Arabian Cafe" },
  receiptFooter: { type: String, default: "Thank you for dining with us!" }
}, { timestamps: true });

module.exports = mongoose.model("Tax", taxSchema);
