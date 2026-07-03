import styles from "./InvoiceNotes.module.css";

export default function InvoiceNotes() {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h2>Notes & Terms</h2>
      </div>

      <div className={styles.container}>

        <div className={styles.field}>
          <label>Customer Notes</label>

          <textarea
            rows="4"
            placeholder="Notes that will appear on the invoice..."
          />
        </div>

        <div className={styles.field}>
          <label>Internal Notes</label>

          <textarea
            rows="4"
            placeholder="Visible only to staff..."
          />
        </div>

        <div className={styles.field}>
          <label>Terms & Conditions</label>

          <textarea
            rows="5"
            defaultValue={`1. Goods once sold cannot be returned.
2. Payment is due upon receipt.
3. Thank you for choosing Arabian Cafe.`}
          />
        </div>

      </div>

    </div>
  );
}