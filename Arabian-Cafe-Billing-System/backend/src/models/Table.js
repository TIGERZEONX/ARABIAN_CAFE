const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true, unique: true },
  seatingCapacity: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Reserved", "Billed"],
    default: "Available"
  },
  currentOrderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Table", tableSchema);
