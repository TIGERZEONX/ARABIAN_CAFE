import React, { useMemo, useState } from "react";

import BillingLayout from "../templates/BillingLayout";

const Billing = () => {
  // ==========================
  // Search
  // ==========================

  const [search, setSearch] = useState("");

  // ==========================
  // Customer
  // ==========================

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [remarks, setRemarks] = useState("");

  // ==========================
  // Payment
  // ==========================

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountReceived, setAmountReceived] = useState("");

  // ==========================
  // Products
  // ==========================

  const [products] = useState([
    {
      id: 1,
      name: "Chicken Shawarma",
      category: "Shawarma",
      price: 180,
      available: true,
    },
    {
      id: 2,
      name: "Zinger Burger",
      category: "Burger",
      price: 160,
      available: true,
    },
    {
      id: 3,
      name: "Arabic Tea",
      category: "Beverage",
      price: 30,
      available: true,
    },
    {
      id: 4,
      name: "Chicken Roll",
      category: "Roll",
      price: 120,
      available: true,
    },
    {
      id: 5,
      name: "French Fries",
      category: "Snacks",
      price: 90,
      available: true,
    },
  ]);

  // ==========================
  // Cart
  // ==========================

  const [cart, setCart] = useState([]);

  // ==========================
  // Filter Products
  // ==========================

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  // ==========================
  // Add Product
  // ==========================

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // ==========================
  // Increase Quantity
  // ==========================

  const increaseQuantity = (item) => {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );
  };

  // ==========================
  // Decrease Quantity
  // ==========================

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeItem(item);
      return;
    }

    setCart(
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      )
    );
  };

  // ==========================
  // Remove Item
  // ==========================

  const removeItem = (item) => {
    setCart(
      cart.filter(
        (cartItem) => cartItem.id !== item.id
      )
    );
  };

  // ==========================
  // Total
  // ==========================

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cart]);

  // ==========================
  // Complete Payment
  // ==========================

  const completePayment = () => {
    console.log("Payment Successful");
  };

  const printBill = () => {
    console.log("Print Bill");
  };

  return (
    <BillingLayout
      // Search
      searchValue={search}
      onSearchChange={setSearch}
      onSearch={() => {}}
      onClearSearch={() => setSearch("")}

      // Customer
      customerFormProps={{
        customerName,
        onCustomerNameChange: setCustomerName,

        phone,
        onPhoneChange: setPhone,

        tableNumber,
        onTableChange: setTableNumber,

        remarks,
        onRemarksChange: setRemarks,

        tableOptions: [
          {
            label: "Table 1",
            value: "1",
          },
          {
            label: "Table 2",
            value: "2",
          },
          {
            label: "Table 3",
            value: "3",
          },
          {
            label: "Table 4",
            value: "4",
          },
          {
            label: "Take Away",
            value: "takeaway",
          },
        ],
      }}

      // Products
      products={filteredProducts}
      onAddToCart={addToCart}

      // Cart
      cartItems={cart}
      onIncreaseQuantity={increaseQuantity}
      onDecreaseQuantity={decreaseQuantity}
      onRemoveItem={removeItem}

      // Payment
      paymentPanelProps={{
        paymentMethod,
        onPaymentMethodChange:
          setPaymentMethod,

        totalAmount,

        amountReceived,
        onAmountReceivedChange:
          setAmountReceived,

        onCompletePayment:
          completePayment,

        onPrintBill: printBill,
      }}
    />
  );
};

export default Billing;