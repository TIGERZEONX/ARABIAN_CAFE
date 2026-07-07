import React, { useMemo, useState, useEffect } from "react";
import { Alert } from "react-native";

import BillingLayout from "../templates/BillingLayout";
import inventoryApi from "../../api/inventoryApi";
import billingApi from "../../api/billingApi";

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

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await inventoryApi.getInventory();
        const items = response.data || response || [];
        setProducts(items);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };

    loadProducts();
  }, []);

  // ==========================
  // Cart
  // ==========================

  const [cart, setCart] = useState([]);

  // ==========================
  // Filter Products
  // ==========================

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      (item?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  // Helper function to safely get either MongoDB _id or standard id
  const getIdentifier = (item) => item?._id || item?.id;

  // ==========================
  // Add Product
  // ==========================

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => getIdentifier(item) === getIdentifier(product)
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          getIdentifier(item) === getIdentifier(product)
            ? { ...item, quantity: item.quantity + 1 }
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

  const increaseQuantity = (product) => {
    setCart(
      cart.map((item) =>
        getIdentifier(item) === getIdentifier(product)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ==========================
  // Decrease Quantity
  // ==========================

  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      removeItem(product);
      return;
    }

    setCart(
      cart.map((item) =>
        getIdentifier(item) === getIdentifier(product)
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ==========================
  // Remove Item
  // ==========================

  const removeItem = (product) => {
    setCart(
      cart.filter((item) => getIdentifier(item) !== getIdentifier(product))
    );
  };

  // ==========================
  // Total
  // ==========================

  const totalAmount = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + (item.price || 0) * item.quantity,
      0
    );
  }, [cart]);

  // ==========================
  // Complete Payment
  // ==========================

  const completePayment = async () => {
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Please add items to the cart before completing payment.");
      return;
    }

    try {
      const invoiceData = {
        customerName: customerName || "Walk-in",
        phone: phone || "",
        tableNumber: tableNumber || "Takeaway",
        remarks,
        items: cart.map((item) => ({
          product: getIdentifier(item),
          quantity: item.quantity,
          price: item.price || 0,
        })),
        totalAmount,
        paymentMethod,
        amountReceived: amountReceived ? parseFloat(amountReceived) : totalAmount,
      };

      // Send the data to your real database!
      await billingApi.createInvoice(invoiceData);

      // Clear the form and cart upon success
      setCart([]);
      setCustomerName("");
      setPhone("");
      setTableNumber("");
      setRemarks("");
      setAmountReceived("");

      Alert.alert("Success", "Payment Successful! Invoice saved to database.");
    } catch (error) {
      console.error("Failed to process payment:", error);
      Alert.alert("Error", "Failed to process payment. Please try again.");
    }
  };

  const printBill = () => {
    if (cart.length === 0) {
      Alert.alert("Empty Cart", "Cannot print an empty bill.");
      return;
    }
    Alert.alert("Printing", "Printing bill feature not yet connected to hardware.");
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
          { label: "Table 1", value: "1" },
          { label: "Table 2", value: "2" },
          { label: "Table 3", value: "3" },
          { label: "Table 4", value: "4" },
          { label: "Take Away", value: "takeaway" },
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
        onPaymentMethodChange: setPaymentMethod,

        totalAmount,

        amountReceived,
        onAmountReceivedChange: setAmountReceived,

        onCompletePayment: completePayment,

        onPrintBill: printBill,
      }}
    />
  );
};

export default Billing;
