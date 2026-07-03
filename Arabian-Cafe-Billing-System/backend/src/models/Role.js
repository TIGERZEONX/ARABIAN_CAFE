const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // e.g., 'Super Admin', 'Manager', 'Cashier', 'Waiter'
  permissions: [{ type: String }] // e.g., ['create_order', 'modify_settings', 'view_reports']
}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);
