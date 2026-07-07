import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalQuantity: 0,
  subtotal: 0,
  tax: 0,
  discount: 0,
  grandTotal: 0,
};

const calculateTotals = (state) => {
  state.totalItems = state.items.length;

  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  state.subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  state.grandTotal =
    state.subtotal + state.tax - state.discount;
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      calculateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        item.quantity += 1;
      }

      calculateTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (cartItem) => cartItem.id !== id
          );
        }
      }

      calculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== id
      );

      calculateTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalQuantity = 0;
      state.subtotal = 0;
      state.tax = 0;
      state.discount = 0;
      state.grandTotal = 0;
    },

    applyTax: (state, action) => {
      state.tax = action.payload;
      calculateTotals(state);
    },

    applyDiscount: (state, action) => {
      state.discount = action.payload;
      calculateTotals(state);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyTax,
  applyDiscount,
} = cartSlice.actions;

export default cartSlice.reducer;