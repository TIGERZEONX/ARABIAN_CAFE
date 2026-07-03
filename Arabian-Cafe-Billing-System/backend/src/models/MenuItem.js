const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true }, // Base price
  recipe: [{
    ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true },
    quantityRequired: { type: Number, required: true } // e.g., 0.150 for 150 grams
  }],
  variations: [{
    size: { type: String }, // e.g., 'Regular', 'Large'
    price: { type: Number }
  }],
  addons: [{
    name: { type: String }, // e.g., 'Extra Cheese'
    price: { type: Number }
  }],
  image: { type: String, default: "" },
  isAvailable: { type: Boolean, default: true },
  taxPercent: { type: Number, default: 5 } // GST rate for this item
}, { timestamps: true });

module.exports = mongoose.model("MenuItem", menuItemSchema);
