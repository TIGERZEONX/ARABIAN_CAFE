import styles from "./DashboardStats.module.css";
import StatusCard from "../../molecules/StatusCard";

export default function DashboardStats({ stats }) {
    // Format large numbers for clean cards display (e.g. 1500 -> ₹1.5k)
    const formatRevenue = (value) => {
        if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
        return `₹${value}`;
    };

    const cards = [
        {
            title: "Today's Revenue",
            value: stats ? formatRevenue(stats.revenue) : "₹0",
            status: "Active",
        },
        {
            title: "Orders Checked Out",
            value: stats ? stats.orderCount : "0",
            status: "Active",
        },
        {
            title: "Taxes Collected",
            value: stats ? formatRevenue(stats.totalTax) : "₹0",
            status: "Active",
        },
        {
            title: "Table Occupancy",
            value: stats ? `${stats.occupancyRate}%` : "0%",
            status: "Active",
        },
    ];

    return (
        <div className={styles.grid}>
            {cards.map((item) => (
                <StatusCard key={item.title} {...item} />
            ))}
        </div>
    );
}
