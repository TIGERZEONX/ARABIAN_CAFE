import { useState, useEffect } from "react";
import { getCategories, getMenuItems } from "../../services/menuService";
import { getTables } from "../../services/tableService";
import { getTaxSettings } from "../../services/settingService";
import { createOrder } from "../../services/orderService";
import { createInvoice } from "../../services/billingService";
import styles from "./CreateInvoice.module.css";


export default function CreateInvoice() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [tables, setTables] = useState([]);
  const [taxSettings, setTaxSettings] = useState({ cgstRate: 2.5, sgstRate: 2.5, serviceChargeRate: 0 });
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Cart & Customer States
  const [cart, setCart] = useState([]); // [{ menuItemId, name, quantity, price, size }]
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [discount, setDiscount] = useState(0);

  // Status/Messages
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        setLoading(true);
        const [catRes, itemsRes, tablesRes, taxRes] = await Promise.all([
          getCategories(),
          getMenuItems(),
          getTables(),
          getTaxSettings()
        ]);
        setCategories(catRes.data.data);
        setMenuItems(itemsRes.data.data);
        setTables(tablesRes.data.data);
        if (taxRes.data?.data) {
          setTaxSettings(taxRes.data.data);
        }
      } catch (err) {
        console.error("Error loading POS master data:", err);
        setError("Failed to load POS configuration metadata");
      } finally {
        setLoading(false);
      }
    };
    loadMasterData();
  }, []);

  // --- Cart Calculations ---
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxableAmount = Math.max(0, subTotal - discount);
  const cgstAmount = Number(((taxableAmount * taxSettings.cgstRate) / 100).toFixed(2));
  const sgstAmount = Number(((taxableAmount * taxSettings.sgstRate) / 100).toFixed(2));
  const serviceChargeAmount = Number(((taxableAmount * taxSettings.serviceChargeRate) / 100).toFixed(2));
  const grandTotal = Number((taxableAmount + cgstAmount + sgstAmount + serviceChargeAmount).toFixed(2));

  // --- Cart Actions ---
  const addToCart = (dish, sizeOption = null) => {
    const itemPrice = sizeOption ? sizeOption.price : dish.price;
    const itemSize = sizeOption ? sizeOption.size : "Regular";

    const existingIndex = cart.findIndex(item => item.menuItemId === dish._id && item.size === itemSize);

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, {
        menuItemId: dish._id,
        name: dish.name,
        quantity: 1,
        price: itemPrice,
        size: itemSize
      }]);
    }
  };

  const updateQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      setCart(cart.filter((_, i) => i !== index));
    } else {
      setCart(updated);
    }
  };

  const removeCartItem = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  // --- Checkout Action ---
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Please add at least one item to the cart");
      return;
    }

    setMessage(null);
    setError(null);

    try {
      // 1. Create the Order on the backend
      const orderPayload = {
        orderType: selectedTable ? "Dine-In" : "Takeaway",
        tableId: selectedTable || null,
        items: cart,
        subTotal
      };

      const orderResult = await createOrder(orderPayload);
      const orderId = orderResult.data.data._id;

      // 2. Generate the Bill and Checkout
      const billPayload = {
        orderId,
        customerName: customerName || "Guest Customer",
        customerPhone: customerPhone || "",
        paymentMethod,
        discount: Number(discount) || 0,
        billedBy: "64a2b9999999999999999999" // Fallback cashier ID (updated by token auth in interceptor)
      };

      const billResult = await createInvoice(billPayload);
      const bill = billResult.data.data;

      setMessage(`Bill generated successfully! Bill No: ${bill.billNo} 🎉`);

      // 3. Open receipt print window
      triggerReceiptPrint(bill);

      // Reset states
      setCart([]);
      setCustomerName("");
      setCustomerPhone("");
      setSelectedTable("");
      setDiscount(0);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to process checkout");
    }
  };

  // --- Thermal Receipt Printer Window ---
  const triggerReceiptPrint = (bill) => {
    const printWindow = window.open("", "_blank", "width=400,height=600");
    const itemsHtml = cart.map(item => `
      <tr>
        <td style="padding:5px 0;">${item.name} (${item.size}) x${item.quantity}</td>
        <td style="text-align:right; padding:5px 0;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt ${bill.billNo}</title>
          <style>
            body { font-family: 'Courier New', Courier, monospace; font-size: 13px; color:#000; padding:15px; }
            .header { text-align: center; margin-bottom:15px; }
            .divider { border-top: 1px dashed #000; margin:10px 0; }
            table { width: 100%; border-collapse: collapse; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${taxSettings.cafeName}</h2>
            <p>${taxSettings.address}<br>Ph: ${taxSettings.phone}</p>
            <p><strong>INVOICE</strong></p>
          </div>
          <div class="divider"></div>
          <p>Bill No: ${bill.billNo}<br>Date: ${new Date().toLocaleString()}</p>
          <p>Customer: ${bill.customerName} (${bill.customerPhone || "Guest"})</p>
          <div class="divider"></div>
          <table>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div class="divider"></div>
          <table>
            <tr><td>Subtotal:</td><td style="text-align:right;">₹${subTotal.toFixed(2)}</td></tr>
            ${discount > 0 ? `<tr><td>Discount:</td><td style="text-align:right;">- ₹${discount.toFixed(2)}</td></tr>` : ""}
            <tr><td>CGST (${taxSettings.cgstRate}%):</td><td style="text-align:right;">₹${cgstAmount.toFixed(2)}</td></tr>
            <tr><td>SGST (${taxSettings.sgstRate}%):</td><td style="text-align:right;">₹${sgstAmount.toFixed(2)}</td></tr>
            <tr><td><strong>GRAND TOTAL:</strong></td><td style="text-align:right;"><strong>₹${grandTotal.toFixed(2)}</strong></td></tr>
          </table>
          <div class="divider"></div>
          <p style="text-align:center;">${taxSettings.receiptFooter}</p>
          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category?._id === selectedCategory)
    : menuItems;

  if (loading) return <div style={{ padding: "40px", fontFamily: "Poppins" }}>Loading POS configuration...</div>;

  return (
    <div style={{ padding: "30px", fontFamily: "Poppins", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "30px" }}>

      {/* LEFT COLUMN: DISH SELECTION GRID */}
      <div>
        <div style={{ marginBottom: "20px" }}>
          <h2>Arabian Café POS</h2>
          <p style={{ color: "var(--text-light)" }}>Select items to add to the customer cart.</p>
        </div>

        {/* Categories Tab Bar */}
        <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "20px", borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{ padding: "8px 16px", background: selectedCategory === null ? "var(--primary)" : "white", color: selectedCategory === null ? "white" : "var(--text)", border: "1px solid var(--border)", borderRadius: "10px", cursor: "pointer", fontWeight: "600" }}
          >
            All Items
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat._id)}
              style={{ padding: "8px 16px", background: selectedCategory === cat._id ? "var(--primary)" : "white", color: selectedCategory === cat._id ? "white" : "var(--text)", border: "1px solid var(--border)", borderRadius: "10px", cursor: "pointer", fontWeight: "600", whiteSpace: "nowrap" }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
          {filteredMenuItems.map(dish => (
            <div key={dish._id} style={{ background: "white", padding: "18px", borderRadius: "16px", boxShadow: "var(--shadow)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h4 style={{ color: "var(--text)", fontSize: "16px", marginBottom: "4px" }}>{dish.name}</h4>
                <p style={{ fontSize: "12px", color: "var(--text-light)", marginBottom: "12px" }}>{dish.description || "Freshly cooked Arabian delicacy."}</p>
              </div>

              <div>
                {/* Check if variations exist */}
                {dish.variations && dish.variations.length > 0 ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {dish.variations.map(variant => (
                      <button
                        key={variant.size}
                        onClick={() => addToCart(dish, variant)}
                        style={{ flex: 1, padding: "6px 8px", fontSize: "12px", background: "var(--primary-light)", color: "var(--primary-dark)", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                      >
                        {variant.size} (₹{variant.price})
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <strong style={{ color: "var(--primary)" }}>₹{dish.price}</strong>
                    <button
                      onClick={() => addToCart(dish)}
                      style={{ padding: "6px 14px", background: "var(--primary)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                    >
                      + Add
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT COLUMN: ACTIVE CART & CHECKOUT FORM */}
      <div style={{ background: "white", padding: "30px", borderRadius: "20px", boxShadow: "var(--shadow)", height: "fit-content" }}>
        <h3 style={{ marginBottom: "20px", borderBottom: "1px solid var(--border)", paddingBottom: "10px", color: "var(--primary-dark)" }}>Current Checkout</h3>

        {message && <div style={{ padding: "12px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", marginBottom: "15px", fontSize: "14px" }}>{message}</div>}
        {error && <div style={{ padding: "12px", background: "#FEE2E2", color: "#991B1B", borderRadius: "8px", marginBottom: "15px", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleCheckout}>

          {/* Customer Info */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>Customer Phone</label>
              <input type="text" placeholder="Phone Number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>Customer Name</label>
              <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }} />
            </div>
          </div>

          {/* Table Selector */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", fontWeight: "500" }}>Allocate Dining Table</label>
            <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} style={{ width: "100%", padding: "10px", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <option value="">Takeaway / Delivery (No Table)</option>
              {tables.map(t => (
                <option key={t._id} value={t._id} disabled={t.status === "Occupied"}>
                  Table {t.tableNumber} (Capacity: {t.seatingCapacity}) {t.status === "Occupied" ? "— Occupied" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Cart Items List */}
          <div style={{ border: "1px solid var(--border)", borderRadius: "12px", padding: "15px", marginBottom: "20px", maxHeight: "250px", overflowY: "auto" }}>
            <h4 style={{ marginBottom: "10px", fontSize: "14px" }}>Cart Items</h4>
            {cart.length === 0 ? (
              <p style={{ color: "var(--text-light)", fontSize: "13px", textAlign: "center", padding: "20px 0" }}>Cart is empty. Click menu items to add.</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "10px", marginBottom: "10px", borderBottom: "1px solid var(--bg)" }}>
                  <div>
                    <h5 style={{ margin: 0, fontSize: "13px" }}>{item.name}</h5>
                    <span style={{ fontSize: "11px", color: "var(--text-light)" }}>Size: {item.size} | Price: ₹{item.price}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button type="button" onClick={() => updateQuantity(index, -1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                    <span style={{ fontSize: "13px", fontWeight: "600" }}>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(index, 1)} style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid var(--border)", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    <button type="button" onClick={() => removeCartItem(index)} style={{ border: "none", background: "transparent", color: "var(--danger)", cursor: "pointer", marginLeft: "10px", fontSize: "13px" }}>✕</button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Financial Breakdown */}
          <div style={{ background: "var(--bg)", padding: "18px", borderRadius: "12px", marginBottom: "20px", fontSize: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Subtotal:</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span>Discount (₹):</span>
              <input type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} style={{ width: "80px", padding: "4px", border: "1px solid var(--border)", borderRadius: "6px", textAlign: "right" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>CGST (${taxSettings.cgstRate}%):</span>
              <span>₹{cgstAmount.toFixed(2)}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>SGST (${taxSettings.sgstRate}%):</span>
              <span>₹{sgstAmount.toFixed(2)}</span>
            </div>

            <hr style={{ border: "none", borderTop: "1px dashed var(--border)", margin: "10px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "700", fontSize: "16px", color: "var(--primary-dark)" }}>
              <span>Grand Total:</span>
              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method & Checkout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "15px" }}>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ padding: "12px", border: "1px solid var(--border)", borderRadius: "10px" }}>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Card">Card</option>
            </select>

            <button type="submit" style={{ padding: "12px 20px", background: "var(--primary)", color: "white", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer" }}>
              Generate & Print Bill
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
