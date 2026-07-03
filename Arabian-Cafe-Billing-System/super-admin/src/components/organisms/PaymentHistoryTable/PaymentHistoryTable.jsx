import styles from "./PaymentHistoryTable.module.css";

const payments = [
  {
    invoice: "INV10001",
    customer: "John Doe",
    total: "₹550",
    paid: "₹550",
    balance: "₹0",
    method: "UPI",
    status: "Paid",
    date: "02 Jul 2026",
  },
  {
    invoice: "INV10002",
    customer: "David",
    total: "₹980",
    paid: "₹500",
    balance: "₹480",
    method: "Cash",
    status: "Partial",
    date: "02 Jul 2026",
  },
  {
    invoice: "INV10003",
    customer: "Alex",
    total: "₹2450",
    paid: "₹0",
    balance: "₹2450",
    method: "Card",
    status: "Pending",
    date: "01 Jul 2026",
  },
];

export default function PaymentHistoryTable() {

  const badgeClass = (status) => {
    switch (status) {
      case "Paid":
        return styles.paid;
      case "Partial":
        return styles.partial;
      case "Pending":
        return styles.pending;
      default:
        return "";
    }
  };

  return (
    <div className={styles.card}>

      <table className={styles.table}>

        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Method</th>
            <th>Status</th>
            <th>Payment Date</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((payment) => (
            <tr key={payment.invoice}>
              <td>{payment.invoice}</td>
              <td>{payment.customer}</td>
              <td>{payment.total}</td>
              <td>{payment.paid}</td>
              <td>{payment.balance}</td>
              <td>{payment.method}</td>

              <td>
                <span className={badgeClass(payment.status)}>
                  {payment.status}
                </span>
              </td>

              <td>{payment.date}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}