import { useEffect, useState } from "react";
import styles from "./BillingTable.module.css";
import { getInvoices } from "../../../services/billingService";

export default function BillingTable() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoices()
      .then((res) => {
        setInvoices(res.data.data.slice(0, 5)); // Show latest 5 transactions
      })
      .catch((err) => {
        console.error("Error loading recent bills:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return styles.paid;
      case "Refunded":
        return styles.pending;
      default:
        return "";
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>Loading latest billing transactions...</div>;
  }

  return (
    <div className={styles.tableContainer}>
      <h3 style={{ marginBottom: "15px" }}>Recent Invoices</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Billed Date</th>
            <th>Grand Total</th>
            <th>Payment Mode</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", color: "var(--text-light)" }}>
                No recent transactions logged.
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice._id}>
                <td><strong>{invoice.billNo}</strong></td>
                <td>{invoice.customerName} ({invoice.customerPhone || "Guest"})</td>
                <td>{formatDate(invoice.createdAt)}</td>
                <td>₹{invoice.grandTotal}</td>
                <td>{invoice.paymentMethod}</td>
                <td>
                  <span className={`${getStatusClass(invoice.paymentStatus)} badge`}>
                    {invoice.paymentStatus}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
