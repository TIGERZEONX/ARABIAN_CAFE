import styles from "./InvoiceDetailsCard.module.css";

export default function InvoiceDetailsCard() {
  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <div>
          <h1>Invoice #INV-20260702001</h1>
          <p>Created on 02 Jul 2026</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.secondary}>Print</button>
          <button className={styles.secondary}>Download PDF</button>
          <button className={styles.primary}>Edit Invoice</button>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Customer Information</h2>

        <div className={styles.grid}>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Branch:</strong> Main Branch</p>
          <p><strong>Payment:</strong> UPI</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Invoice Items</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Cappuccino</td>
              <td>2</td>
              <td>₹150</td>
              <td>₹300</td>
            </tr>

            <tr>
              <td>Chicken Burger</td>
              <td>1</td>
              <td>₹250</td>
              <td>₹250</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.summary}>
        <div><span>Subtotal</span><strong>₹550</strong></div>
        <div><span>Tax</span><strong>₹27.50</strong></div>
        <div><span>Discount</span><strong>-₹25</strong></div>
        <div className={styles.total}>
          <span>Grand Total</span>
          <strong>₹552.50</strong>
        </div>
      </div>

    </div>
  );
}