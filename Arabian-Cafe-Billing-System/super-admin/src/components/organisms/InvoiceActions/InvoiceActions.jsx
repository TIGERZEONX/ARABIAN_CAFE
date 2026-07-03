import styles from "./InvoiceActions.module.css";

export default function InvoiceActions() {
  return (
    <div className={styles.card}>

      <div className={styles.left}>

        <button className={styles.cancel}>
          Cancel
        </button>

      </div>

      <div className={styles.right}>

        <button className={styles.secondary}>
          Save Draft
        </button>

        <button className={styles.secondary}>
          Preview
        </button>

        <button className={styles.secondary}>
          Print
        </button>

        <button className={styles.primary}>
          Generate Invoice
        </button>

      </div>

    </div>
  );
}