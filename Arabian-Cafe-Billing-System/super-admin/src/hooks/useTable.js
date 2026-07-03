import { useState, useEffect } from "react";
import { getTables, updateTableStatus } from "../services/tableService";

export default function useTable() {
    const [tables, setTables] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const res = await getTables();
            setTables(res.data.data);
            setError(null);
        } catch (err) {
            console.error("Error loading tables:", err);
            setError(err.response?.data?.message || "Failed to load tables");
        } finally {
            setLoading(false);
        }
    };

    const changeStatus = async (tableId, status, currentOrderId = null) => {
        try {
            const res = await updateTableStatus(tableId, status, currentOrderId);
            setTables(prev => prev.map(t => t._id === tableId ? res.data.data : t));
            return res.data.data;
        } catch (err) {
            console.error("Error updating table status:", err);
            throw new Error(err.response?.data?.message || "Failed to update table status");
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return {
        tables,
        loading,
        error,
        refresh: fetchTables,
        changeStatus
    };
}
