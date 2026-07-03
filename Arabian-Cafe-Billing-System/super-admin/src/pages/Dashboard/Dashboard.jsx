import DashboardTemplate from "../../components/templates/DashboardTemplate";
import DashboardStats from "../../components/organisms/DashboardStats";
import RevenueChart from "../../components/organisms/RevenueChart";
import BillingTable from "../../components/organisms/BillingTable";
import useDashboard from "../../hooks/useDashboard";

export default function Dashboard() {
  const { stats, chartData, loading, error } = useDashboard();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", fontFamily: "Poppins" }}>
        <h3>Loading dashboard statistics...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", color: "var(--danger)", fontFamily: "Poppins" }}>
        <h3>Error: {error}</h3>
      </div>
    );
  }

  return (
    <DashboardTemplate>
      <DashboardStats stats={stats} />
      <RevenueChart chartData={chartData} />
      <BillingTable />
    </DashboardTemplate>
  );
}
