import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,

  loading: false,
  error: null,

  totalOrders: 0,
  totalSales: 0,

  filterStatus: "All",
};

const calculateSummary = (state) => {
  state.totalOrders = state.orders.length;

  state.totalSales = state.orders.reduce(
    (sum, order) => sum + Number(order.grandTotal || 0),
    0
  );
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    // ==========================
    // Fetch Orders
    // ==========================

    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;

      calculateSummary(state);
    },

    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================
    // Current Order
    // ==========================

    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },

    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },

    // ==========================
    // Create Order
    // ==========================

    addOrder: (state, action) => {
      state.orders.unshift(action.payload);

      calculateSummary(state);
    },

    // ==========================
    // Update Order
    // ==========================

    updateOrder: (state, action) => {
      const updatedOrder = action.payload;

      const index = state.orders.findIndex(
        (order) => order.id === updatedOrder.id
      );

      if (index !== -1) {
        state.orders[index] = updatedOrder;
      }

      if (
        state.currentOrder &&
        state.currentOrder.id === updatedOrder.id
      ) {
        state.currentOrder = updatedOrder;
      }

      calculateSummary(state);
    },

    // ==========================
    // Delete Order
    // ==========================

    deleteOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );

      if (
        state.currentOrder &&
        state.currentOrder.id === action.payload
      ) {
        state.currentOrder = null;
      }

      calculateSummary(state);
    },

    // ==========================
    // Status
    // ==========================

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;

      const order = state.orders.find(
        (item) => item.id === id
      );

      if (order) {
        order.status = status;
      }

      if (
        state.currentOrder &&
        state.currentOrder.id === id
      ) {
        state.currentOrder.status = status;
      }
    },

    updatePaymentStatus: (state, action) => {
      const { id, paymentStatus } = action.payload;

      const order = state.orders.find(
        (item) => item.id === id
      );

      if (order) {
        order.paymentStatus = paymentStatus;
      }

      if (
        state.currentOrder &&
        state.currentOrder.id === id
      ) {
        state.currentOrder.paymentStatus =
          paymentStatus;
      }
    },

    // ==========================
    // Filter
    // ==========================

    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },

    clearFilterStatus: (state) => {
      state.filterStatus = "All";
    },

    // ==========================
    // Error
    // ==========================

    clearOrderError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,

  setCurrentOrder,
  clearCurrentOrder,

  addOrder,
  updateOrder,
  deleteOrder,

  updateOrderStatus,
  updatePaymentStatus,

  setFilterStatus,
  clearFilterStatus,

  clearOrderError,
} = orderSlice.actions;

export default orderSlice.reducer;