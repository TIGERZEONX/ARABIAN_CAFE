const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  purchasePrice: { type: Number, required: true, default: 0 }, // e.g., ₹40
  purchaseUnit: { type: String, required: true, default: "kg" }, // e.g., "kg"
  recipeUnit: { type: String, required: true, default: "gm" }, // e.g., "gm"
  conversionFactor: { type: Number, required: true, default: 1000 }, // e.g., 1000 (1kg = 1000g)
  costPerUnit: { type: Number, default: 0 }, // Portional Cost (automatically calculated: purchasePrice / conversionFactor)

  // Stock is tracked in the Recipe Unit (e.g. grams or ml)
  stock: { type: Number, required: true, default: 0 },
  minStockAlert: { type: Number, default: 1000 }
}, { timestamps: true });

// Auto-calculate portion cost per recipe unit before saving to database
ingredientSchema.pre("save", function (next) {
  if (this.conversionFactor && this.conversionFactor > 0) {
    this.costPerUnit = Number((this.purchasePrice / this.conversionFactor).toFixed(4));
  } else {
    this.costPerUnit = this.purchasePrice;
  }
  next();
});

module.exports = mongoose.model("Ingredient", ingredientSchema);
