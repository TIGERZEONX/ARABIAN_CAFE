import styles from "./RevenueChart.module.css";

export default function RevenueChart({ chartData }) {
  // Determine highest sales point to establish 100% scale height
  const maxSales = chartData.length > 0 ? Math.max(...chartData.map(d => d.sales)) : 1;

  // Format date string from YYYY-MM-DD to DD MMM (e.g., 03 Jul)
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short" });
  };

  return (
    <div className={styles.card}>
      <h3>Daily Sales History (Past 7 Days)</h3>

      {chartData.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px", color: "var(--text-light)" }}>
          No transaction history available.
        </div>
      ) : (
        <div className={styles.chart} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", height: "240px", marginTop: "20px" }}>
          {chartData.map((item, index) => {
            const pct = Math.max(10, (item.sales / maxSales) * 100); // minimum 10% height for visual trace
            return (
              <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <span style={{ fontSize: "11px", color: "var(--text-light)", marginBottom: "4px" }}>
                  ₹{item.sales > 1000 ? `${(item.sales / 1000).toFixed(1)}k` : item.sales}
                </span>

                <div
                  className={styles.bar}
                  style={{
                    height: `${pct}px`,
                    width: "40px",
                    background: "var(--primary)",
                    borderRadius: "8px 8px 0 0",
                    transition: "height 0.3s ease"
                  }}
                  title={`Date: ${item.date}\nSales: ₹${item.sales}\nOrders: ${item.orders}`}
                />

                <span style={{ fontSize: "12px", color: "var(--text)", marginTop: "8px", fontWeight: "500" }}>
                  {formatDate(item.date)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
