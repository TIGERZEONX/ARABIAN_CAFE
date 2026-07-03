import styles from "./InvoiceSummary.module.css";

export default function InvoiceSummary() {

  const summary = {
    subtotal: 2500,
    tax: 125,
    discount: 100,
    roundOff: 0,
    grandTotal: 2525,
  };

  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h2>Invoice Summary</h2>
      </div>

      <div className={styles.summary}>

        <div className={styles.row}>
          <span>Subtotal</span>
          <strong>₹ {summary.subtotal.toFixed(2)}</strong>
        </div>

        <div className={styles.row}>
          <span>Tax</span>
          <strong>₹ {summary.tax.toFixed(2)}</strong>
        </div>

        <div className={styles.row}>
          <span>Discount</span>
          <strong>- ₹ {summary.discount.toFixed(2)}</strong>
        </div>

        <div className={styles.row}>
          <span>Round Off</span>
          <strong>₹ {summary.roundOff.toFixed(2)}</strong>
        </div>

        <hr />

        <div className={styles.total}>
          <span>Grand Total</span>
          <strong>₹ {summary.grandTotal.toFixed(2)}</strong>
        </div>

      </div>

    </div>
  );
}