import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";

export default function BillingDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setDashboard(res.data.data);
      })
      .catch((err) => {
        console.error(err);
        setError(err.response?.data?.message || err.message || "Failed to load dashboard statistics");
      });
  }, []);

  if (error) {
    return <div style={{ padding: "20px", color: "var(--danger)", fontFamily: "Poppins" }}>Error: {error}</div>;
  }

  if (!dashboard) {
    return <div style={{ padding: "20px", fontFamily: "Poppins" }}>Loading statistics...</div>;
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Poppins" }}>
      <h1 style={{ marginBottom: "20px" }}>Billing Dashboard</h1>

      <p style={{ margin: "10px 0" }}><strong>Today's Revenue:</strong> ₹{dashboard.revenue}</p>
      <p style={{ margin: "10px 0" }}><strong>Bills Finalized:</strong> {dashboard.orderCount}</p>
      <p style={{ margin: "10px 0" }}><strong>Seating Occupancy:</strong> {dashboard.occupancyRate}%</p>
      <p style={{ margin: "10px 0" }}><strong>Pending Kitchen Orders:</strong> {dashboard.pendingOrdersCount}</p>
    </div>
  );
}
