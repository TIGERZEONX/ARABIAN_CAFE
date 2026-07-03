import styles from "./InvoicePayment.module.css";

export default function InvoicePayment() {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h2>Payment Information</h2>
      </div>

      <div className={styles.grid}>

        <div className={styles.field}>
          <label>Payment Method</label>

          <select>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
            <option>Wallet</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Payment Status</label>

          <select>
            <option>Paid</option>
            <option>Pending</option>
            <option>Partial</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Amount Received</label>

          <input
            type="number"
            placeholder="0.00"
          />
        </div>

        <div className={styles.field}>
          <label>Balance Due</label>

          <input
            type="number"
            value="0.00"
            readOnly
          />
        </div>

        <div className={styles.field}>
          <label>Transaction Reference</label>

          <input
            type="text"
            placeholder="Txn ID / Reference Number"
          />
        </div>

      </div>

    </div>
  );
}