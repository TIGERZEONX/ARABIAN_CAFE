import { useEffect, useState } from "react";
import styles from "./TransactionTable.module.css";
import { getInvoices } from "../../../services/billingService";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = () => {
    setLoading(true);
    getInvoices()
      .then((res) => {
        setTransactions(res.data.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading transactions:", err);
        setError("Failed to load transactions history");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const badgeClass = (status) => {
    switch (status) {
      case "Paid":
        return styles.success;
      case "Refunded":
        return styles.pending;
      default:
        return "";
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <div style={{ padding: "30px", textAlign: "center", fontFamily: "Poppins" }}>Loading transactions...</div>;
  }

  if (error) {
    return <div style={{ padding: "30px", textAlign: "center", color: "var(--danger)", fontFamily: "Poppins" }}>{error}</div>;
  }

  return (
    <div className={styles.card}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "var(--text-light)" }}>
                No payment transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((item) => (
              <tr key={item._id}>
                <td><strong>{item.billNo}</strong></td>
                <td>{item.customerName} ({item.customerPhone || "Guest"})</td>
                <td>{item.paymentMethod}</td>
                <td>₹{item.grandTotal}</td>
                <td>
                  <span className={`${badgeClass(item.paymentStatus)} badge`}>
                    {item.paymentStatus}
                  </span>
                </td>
                <td>{formatDate(item.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
