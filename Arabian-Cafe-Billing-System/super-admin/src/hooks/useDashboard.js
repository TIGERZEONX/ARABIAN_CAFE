import { useState, useEffect } from "react";
import { getDashboardStats, getSalesChartData } from "../services/dashboardService";

export default function useDashboard() {
    const [stats, setStats] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsRes, chartRes] = await Promise.all([
                getDashboardStats(),
                getSalesChartData()
            ]);
            setStats(statsRes.data.data);
            setChartData(chartRes.data.data);
            setError(null);
        } catch (err) {
            console.error("Error loading dashboard data:", err);
            setError(err.response?.data?.message || err.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return {
        stats,
        chartData,
        loading,
        error,
        refresh: fetchDashboardData
    };
}
