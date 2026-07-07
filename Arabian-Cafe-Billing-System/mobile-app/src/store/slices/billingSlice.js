import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentInvoice: null,
  history: [],
  isLoading: false,
  error: null,
};

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentInvoice: (state, action) => {
      state.currentInvoice = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearBillingState: () => initialState,
  },
});

export const { setLoading, setCurrentInvoice, setHistory, setError, clearBillingState } = billingSlice.actions;

export default billingSlice.reducer;
