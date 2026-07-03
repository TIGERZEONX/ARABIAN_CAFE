const dashboardService = require("../services/dashboard.service");

const getStats = async (req, res, next) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};

const getSalesChart = async (req, res, next) => {
    try {
        const chartData = await dashboardService.getSalesChartData();
        res.status(200).json({ success: true, data: chartData });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStats,
    getSalesChart
};
