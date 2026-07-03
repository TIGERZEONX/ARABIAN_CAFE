const Ingredient = require("../models/Ingredient");
const Bill = require("../models/Bill");

// Get all raw materials
const getAllIngredients = async () => {
    return await Ingredient.find().sort({ name: 1 });
};

// Create raw material
const createIngredient = async (data) => {
    return await Ingredient.create(data);
};

// Update stock/cost
const updateIngredient = async (id, data) => {
    if (data.purchasePrice !== undefined || data.conversionFactor !== undefined) {
        const current = await Ingredient.findById(id);
        const price = data.purchasePrice !== undefined ? data.purchasePrice : current.purchasePrice;
        const factor = data.conversionFactor !== undefined ? data.conversionFactor : current.conversionFactor;
        data.costPerUnit = factor > 0 ? Number((price / factor).toFixed(4)) : price;
    }
    return await Ingredient.findByIdAndUpdate(id, data, { new: true });
};

// Delete material
const deleteIngredient = async (id) => {
    return await Ingredient.findByIdAndDelete(id);
};

// Estimate Profit and Loss report
const getProfitLossReport = async (query = {}) => {
    const { startDate, endDate } = query;
    const filter = {};

    if (startDate && endDate) {
        filter.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        };
    }

    const bills = await Bill.find(filter).populate({
        path: "orderId",
        populate: { path: "items.menuItemId" }
    });

    let totalRevenue = 0;
    let totalMaterialCost = 0;
    const itemMargins = {};

    for (const bill of bills) {
        const netSale = bill.subTotal - bill.discount;
        totalRevenue += netSale;

        if (bill.orderId && bill.orderId.items) {
            for (const item of bill.orderId.items) {
                const menuItem = item.menuItemId;
                if (!menuItem) continue;

                // Calculate material cost of this item using recipe linked ingredients
                let itemUnitCost = 0;
                if (menuItem.recipe && menuItem.recipe.length > 0) {
                    for (const recipeItem of menuItem.recipe) {
                        const ingredient = await Ingredient.findById(recipeItem.ingredient);
                        if (ingredient) {
                            itemUnitCost += recipeItem.quantityRequired * ingredient.costPerUnit;
                        }
                    }
                }

                const totalCost = itemUnitCost * item.quantity;
                const totalItemRevenue = item.price * item.quantity;

                totalMaterialCost += totalCost;

                const itemIdStr = menuItem._id.toString();
                if (!itemMargins[itemIdStr]) {
                    itemMargins[itemIdStr] = {
                        name: menuItem.name,
                        salesCount: 0,
                        revenue: 0,
                        materialCost: 0,
                        profit: 0
                    };
                }

                itemMargins[itemIdStr].salesCount += item.quantity;
                itemMargins[itemIdStr].revenue += totalItemRevenue;
                itemMargins[itemIdStr].materialCost += totalCost;
                itemMargins[itemIdStr].profit += (totalItemRevenue - totalCost);
            }
        }
    }

    const netProfit = totalRevenue - totalMaterialCost;
    const profitMarginPercent = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return {
        totalRevenue,
        totalMaterialCost,
        netProfit,
        profitMarginPercent: Number(profitMarginPercent.toFixed(2)),
        itemsReport: Object.values(itemMargins).sort((a, b) => b.profit - a.profit)
    };
};

module.exports = {
    getAllIngredients,
    createIngredient,
    updateIngredient,
    deleteIngredient,
    getProfitLossReport
};
