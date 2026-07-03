import styles from "./InvoiceCustomer.module.css";

export default function InvoiceCustomer() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2>Customer & Invoice Information</h2>
      </div>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label>Customer</label>
          <select>
            <option>Select Customer</option>
            <option>John Doe</option>
            <option>David</option>
            <option>Alex</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Branch</label>
          <select>
            <option>Main Branch</option>
            <option>City Branch</option>
            <option>Mall Branch</option>
          </select>
        </div>

        <div className={styles.field}>
          <label>Invoice Number</label>
          <input
            type="text"
            value="INV-20260702001"
            readOnly
          />
        </div>

        <div className={styles.field}>
          <label>Invoice Date</label>
          <input
            type="date"
            defaultValue="2026-07-02"
          />
        </div>

        <div className={styles.field}>
          <label>Due Date</label>
          <input
            type="date"
          />
        </div>

        <div className={styles.field}>
          <label>Payment Method</label>
          <select>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>
        </div>
      </div>
    </div>
  );
}