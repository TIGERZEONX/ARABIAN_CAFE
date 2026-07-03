import { useState } from "react";
import styles from "./InvoiceItems.module.css";

export default function InvoiceItems() {
  const [items, setItems] = useState([
    {
      product: "",
      qty: 1,
      price: 0,
      tax: 0,
      discount: 0,
    },
  ]);

  const addRow = () => {
    setItems([
      ...items,
      {
        product: "",
        qty: 1,
        price: 0,
        tax: 0,
        discount: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const rowTotal = (item) => {
    const subtotal = item.qty * item.price;
    const tax = subtotal * item.tax / 100;

    return subtotal + tax - item.discount;
  };

  return (
    <div className={styles.card}>

      <div className={styles.header}>
        <h2>Invoice Items</h2>

        <button onClick={addRow}>
          + Add Item
        </button>
      </div>

      <table>

        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Tax %</th>
            <th>Discount</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {items.map((item, index) => (

            <tr key={index}>

              <td>
                <input
                  value={item.product}
                  onChange={(e) =>
                    updateItem(index, "product", e.target.value)
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.qty}
                  onChange={(e) =>
                    updateItem(index, "qty", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.tax}
                  onChange={(e) =>
                    updateItem(index, "tax", Number(e.target.value))
                  }
                />
              </td>

              <td>
                <input
                  type="number"
                  value={item.discount}
                  onChange={(e) =>
                    updateItem(index, "discount", Number(e.target.value))
                  }
                />
              </td>

              <td>
                ₹{rowTotal(item).toFixed(2)}
              </td>

              <td>
                <button onClick={() => removeRow(index)}>
                  Remove
                </button>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}