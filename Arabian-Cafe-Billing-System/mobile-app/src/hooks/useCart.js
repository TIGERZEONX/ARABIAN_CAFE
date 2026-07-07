import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyTax,
  applyDiscount,
} from "../store/slices/cartSlice";

const useCart = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  // ==========================
  // Add Product
  // ==========================

  const addItem = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  // ==========================
  // Increase Quantity
  // ==========================

  const increase = useCallback(
    (id) => {
      dispatch(increaseQuantity(id));
    },
    [dispatch]
  );

  // ==========================
  // Decrease Quantity
  // ==========================

  const decrease = useCallback(
    (id) => {
      dispatch(decreaseQuantity(id));
    },
    [dispatch]
  );

  // ==========================
  // Remove Item
  // ==========================

  const remove = useCallback(
    (id) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  // ==========================
  // Clear Cart
  // ==========================

  const clear = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // ==========================
  // Apply Tax
  // ==========================

  const setTax = useCallback(
    (taxAmount) => {
      dispatch(applyTax(taxAmount));
    },
    [dispatch]
  );

  // ==========================
  // Apply Discount
  // ==========================

  const setDiscount = useCallback(
    (discountAmount) => {
      dispatch(applyDiscount(discountAmount));
    },
    [dispatch]
  );

  // ==========================
  // Checkout Data
  // ==========================

  const checkout = useCallback(() => {
    return {
      items: cart.items,
      totalItems: cart.totalItems,
      totalQuantity: cart.totalQuantity,
      subtotal: cart.subtotal,
      tax: cart.tax,
      discount: cart.discount,
      grandTotal: cart.grandTotal,
    };
  }, [cart]);

  // ==========================
  // Find Product
  // ==========================

  const findItem = useCallback(
    (id) => {
      return cart.items.find(
        (item) => item.id === id
      );
    },
    [cart.items]
  );

  // ==========================
  // Product Exists
  // ==========================

  const isInCart = useCallback(
    (id) => {
      return cart.items.some(
        (item) => item.id === id
      );
    },
    [cart.items]
  );

  // ==========================
  // Quantity
  // ==========================

  const getQuantity = useCallback(
    (id) => {
      const item = cart.items.find(
        (item) => item.id === id
      );

      return item ? item.quantity : 0;
    },
    [cart.items]
  );

  return {
    ...cart,

    addItem,

    increase,

    decrease,

    remove,

    clear,

    setTax,

    setDiscount,

    checkout,

    findItem,

    isInCart,

    getQuantity,
  };
};

export default useCart;