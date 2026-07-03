const Bill = require("../models/Bill");
const Order = require("../models/Order");
const Table = require("../models/Table");

// ================================
// Get Overall Stats
// ================================
const getDashboardStats = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Fetch Today's bills
    const todayBills = await Bill.find({
        createdAt: { $gte: today }
    });

    // 2. Calculations
    const revenue = todayBills.reduce((sum, bill) => sum + bill.grandTotal, 0);
    const orderCount = todayBills.length;
    const cgstCollected = todayBills.reduce((sum, bill) => sum + bill.cgst, 0);
    const sgstCollected = todayBills.reduce((sum, bill) => sum + bill.sgst, 0);
    const totalTax = cgstCollected + sgstCollected;
    const averageBillValue = orderCount > 0 ? Number((revenue / orderCount).toFixed(2)) : 0;

    // 3. Active Operations Stats
    const totalTables = await Table.countDocuments();
    const occupiedTables = await Table.countDocuments({ status: "Occupied" });
    const pendingOrdersCount = await Order.countDocuments({ status: { $in: ["Pending", "Preparing"] } });

    return {
        revenue,
        orderCount,
        averageBillValue,
        totalTax,
        occupancyRate: totalTables > 0 ? Number(((occupiedTables / totalTables) * 100).toFixed(2)) : 0,
        pendingOrdersCount
    };
};

// ================================
// Get Sales Chart Data (Past 7 Days)
// ================================
const getSalesChartData = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const stats = await Bill.aggregate([
        {
            $match: {
                createdAt: { $gte: sevenDaysAgo }
            }
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                sales: { $sum: "$grandTotal" },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    ]);

    return stats.map(item => ({
        date: item._id,
        sales: item.sales,
        orders: item.count
    }));
};

module.exports = {
    getDashboardStats,
    getSalesChartData
};
