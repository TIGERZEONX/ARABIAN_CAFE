import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  filteredCustomers: [],
  selectedCustomer: null,

  search: "",

  loading: false,
  error: null,
};

const filterCustomers = (state) => {
  if (!state.search.trim()) {
    state.filteredCustomers = state.customers;
    return;
  }

  const keyword = state.search.toLowerCase();

  state.filteredCustomers = state.customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(keyword) ||
      customer.phone.includes(keyword) ||
      (customer.email || "")
        .toLowerCase()
        .includes(keyword)
  );
};

const customerSlice = createSlice({
  name: "customers",

  initialState,

  reducers: {
    // ==========================
    // Fetch Customers
    // ==========================

    fetchCustomersStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchCustomersSuccess: (state, action) => {
      state.loading = false;

      state.customers = action.payload;
      state.filteredCustomers = action.payload;
    },

    fetchCustomersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ==========================
    // CRUD
    // ==========================

    addCustomer: (state, action) => {
      state.customers.unshift(action.payload);
      filterCustomers(state);
    },

    updateCustomer: (state, action) => {
      const updatedCustomer = action.payload;

      const index = state.customers.findIndex(
        (customer) =>
          customer.id === updatedCustomer.id
      );

      if (index !== -1) {
        state.customers[index] = updatedCustomer;
      }

      if (
        state.selectedCustomer &&
        state.selectedCustomer.id ===
          updatedCustomer.id
      ) {
        state.selectedCustomer =
          updatedCustomer;
      }

      filterCustomers(state);
    },

    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) =>
          customer.id !== action.payload
      );

      if (
        state.selectedCustomer &&
        state.selectedCustomer.id ===
          action.payload
      ) {
        state.selectedCustomer = null;
      }

      filterCustomers(state);
    },

    // ==========================
    // Selection
    // ==========================

    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },

    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },

    // ==========================
    // Search
    // ==========================

    setCustomerSearch: (state, action) => {
      state.search = action.payload;
      filterCustomers(state);
    },

    clearCustomerSearch: (state) => {
      state.search = "";
      state.filteredCustomers =
        state.customers;
    },

    // ==========================
    // Loyalty
    // ==========================

    updateLoyalty: (state, action) => {
      const { id, loyalty } = action.payload;

      const customer = state.customers.find(
        (item) => item.id === id
      );

      if (customer) {
        customer.loyalty = loyalty;
      }

      filterCustomers(state);
    },

    // ==========================
    // Error
    // ==========================

    clearCustomerError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,

  addCustomer,
  updateCustomer,
  deleteCustomer,

  setSelectedCustomer,
  clearSelectedCustomer,

  setCustomerSearch,
  clearCustomerSearch,

  updateLoyalty,

  clearCustomerError,
} = customerSlice.actions;

export default customerSlice.reducer;