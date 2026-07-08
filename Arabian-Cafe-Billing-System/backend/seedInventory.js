require("dotenv").config();
const mongoose = require("mongoose");
const Ingredient = require("./src/models/Ingredient");
const connectDatabase = require("./src/config/database");

const seedInventory = async () => {
    try {
        await connectDatabase();

        // Clear existing inventory to avoid duplicates (optional)
        await Ingredient.deleteMany({});
        console.log("🧹 Cleared existing inventory...");

        const ingredients = [
            {
                name: "Chicken (Whole)",
                purchasePrice: 200, // e.g., ₹200 per kg
                purchaseUnit: "kg",
                recipeUnit: "gm",
                conversionFactor: 1000, // 1kg = 1000g
                stock: 50000, // 50kg in stock (tracked in grams)
                minStockAlert: 10000 // Alert when below 10kg
            },
            {
                name: "Basmati Rice",
                purchasePrice: 150, 
                purchaseUnit: "kg",
                recipeUnit: "gm",
                conversionFactor: 1000, 
                stock: 100000, // 100kg
                minStockAlert: 20000 // 20kg
            },
            {
                name: "Garlic Paste",
                purchasePrice: 120, 
                purchaseUnit: "kg",
                recipeUnit: "gm",
                conversionFactor: 1000, 
                stock: 5000, // 5kg
                minStockAlert: 1000 // 1kg
            },
            {
                name: "Shawarma Spice Mix",
                purchasePrice: 500, 
                purchaseUnit: "kg",
                recipeUnit: "gm",
                conversionFactor: 1000, 
                stock: 2000, // 2kg
                minStockAlert: 500 // 500g
            },
            {
                name: "Vegetable Oil",
                purchasePrice: 130, 
                purchaseUnit: "liter",
                recipeUnit: "ml",
                conversionFactor: 1000, // 1 liter = 1000ml
                stock: 20000, // 20 liters
                minStockAlert: 5000 // 5 liters
            }
        ];

        await Ingredient.insertMany(ingredients);
        console.log("✅ Inventory Successfully Seeded!");

    } catch (err) {
        console.error("❌ Seeding Error:", err);
    } finally {
        await mongoose.disconnect();
        process.exit();
    }
};

seedInventory();
