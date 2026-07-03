import { useState, useEffect } from "react";
import { getProfitLossReport } from "../../services/inventoryService";
import styles from "./Inventory.module.css";

export default function ProfitLoss() {
    const [report, setReport] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchReport = async () => {
        try {
            setLoading(true);
            const params = {};
            if (startDate && endDate) {
                params.startDate = startDate;
                params.endDate = endDate;
            }
            const res = await getProfitLossReport(params);
            setReport(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [startDate, endDate]);

    if (loading) return <div style={{ padding: "40px", fontFamily: "Poppins" }}>Loading P&L details...</div>;

    return (
        <div style={{ padding: "40px", fontFamily: "Poppins" }}>

            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }}>
                <div>
                    <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--text)" }}>Profit & Loss Reports</h1>
                    <p style={{ color: "var(--text-light)" }}>Calculate net profits by mapping sales revenue against raw material cost prices.</p>
                </div>

                {/* Date Filter */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: "10px", borderRadius: "10px", border: "1px solid var(--border)" }} />
                    <span>to</span>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "10px", borderRadius: "10px", border: "1px solid var(--border)" }} />
                </div>
            </div>

            {/* Summary Cards */}
            {report && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "30px" }}>

                    <div className={styles.card} style={{ borderLeft: "5px solid var(--primary)" }}>
                        <h5 style={{ margin: 0, color: "var(--text-light)" }}>Gross Sales Revenue</h5>
                        <h2 style={{ fontSize: "28px", margin: "10px 0" }}>₹ {report.totalRevenue.toFixed(2)}</h2>
                        <span style={{ fontSize: "12px", color: "#166534" }}>Paid Invoices</span>
                    </div>

                    <div className={styles.card} style={{ borderLeft: "5px solid var(--danger)" }}>
                        <h5 style={{ margin: 0, color: "var(--text-light)" }}>Raw Material Cost (COGS)</h5>
                        <h2 style={{ fontSize: "28px", margin: "10px 0" }}>₹ {report.totalMaterialCost.toFixed(2)}</h2>
                        <span style={{ fontSize: "12px", color: "var(--danger)" }}>Ingredients Used</span>
                    </div>

                    <div className={styles.card} style={{ borderLeft: "5px solid #166534" }}>
                        <h5 style={{ margin: 0, color: "var(--text-light)" }}>Net Profit Margins</h5>
                        <h2 style={{ fontSize: "28px", margin: "10px 0" }}>₹ {report.netProfit.toFixed(2)}</h2>
                        <span style={{ fontSize: "12px", color: "#166534" }}>Sales - COGS</span>
                    </div>

                    <div className={styles.card} style={{ borderLeft: "5px solid var(--info, #3b82f6)" }}>
                        <h5 style={{ margin: 0, color: "var(--text-light)" }}>Avg Margin Percentage</h5>
                        <h2 style={{ fontSize: "28px", margin: "10px 0" }}>{report.profitMarginPercent}%</h2>
                        <span style={{ fontSize: "12px", color: "var(--primary)" }}>Return Rate</span>
                    </div>

                </div>
            )}

            {/* Margins Breakdown */}
            <div className={styles.card}>
                <h3 style={{ marginBottom: "20px", color: "var(--primary-dark)" }}>Item-wise Profit Breakdown</h3>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr style={{ background: "var(--primary-light)" }}>
                                <th>Menu Dish</th>
                                <th>Qty Sold</th>
                                <th>Revenue</th>
                                <th>Material Expenses</th>
                                <th>Dish Net Profit</th>
                                <th>Margin Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {report?.itemsReport.map((item, idx) => {
                                const marginPercent = item.revenue > 0 ? ((item.profit / item.revenue) * 100).toFixed(1) : 0;
                                return (
                                    <tr key={idx}>
                                        <td><strong>{item.name}</strong></td>
                                        <td>{item.salesCount}</td>
                                        <td>₹{item.revenue.toFixed(2)}</td>
                                        <td>₹{item.materialCost.toFixed(2)}</td>
                                        <td><strong style={{ color: "#166534" }}>₹{item.profit.toFixed(2)}</strong></td>
                                        <td>
                                            <span style={{ fontWeight: "700", color: "var(--primary)" }}>{marginPercent}%</span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
