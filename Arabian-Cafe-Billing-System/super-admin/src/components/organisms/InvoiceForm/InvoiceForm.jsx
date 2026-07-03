import styles from "./InvoiceForm.module.css";

export default function InvoiceForm() {
  return (
    <form className={styles.form}>

      {/* Customer Details */}
      <div className={styles.section}>
        <h2>Customer Information</h2>

        <div className={styles.grid}>
          <input type="text" placeholder="Customer Name" />
          <input type="text" placeholder="Phone Number" />
          <input type="email" placeholder="Email Address" />
          <input type="text" placeholder="Branch" />
        </div>
      </div>

      {/* Invoice Items */}
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
              <td>
                <input type="text" placeholder="Product Name" />
              </td>

              <td>
                <input type="number" defaultValue="1" />
              </td>

              <td>
                <input type="number" placeholder="0.00" />
              </td>

              <td>₹0.00</td>
            </tr>
          </tbody>
        </table>

        <button type="button" className={styles.secondaryBtn}>
          + Add Item
        </button>
      </div>

      {/* Totals */}
      <div className={styles.section}>
        <h2>Summary</h2>

        <div className={styles.summary}>
          <div>
            <label>Subtotal</label>
            <input type="text" value="₹0.00" readOnly />
          </div>

          <div>
            <label>Tax (%)</label>
            <input type="number" placeholder="0" />
          </div>

          <div>
            <label>Discount</label>
            <input type="number" placeholder="0" />
          </div>

          <div>
            <label>Grand Total</label>
            <input type="text" value="₹0.00" readOnly />
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className={styles.section}>
        <h2>Payment</h2>

        <select>
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn}>
          Cancel
        </button>

        <button type="submit" className={styles.primaryBtn}>
          Generate Invoice
        </button>
      </div>

    </form>
  );
}