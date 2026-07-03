import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    invoices: [],
    selectedInvoice: null,
    loading: false,
    error: null
};

const billingSlice = createSlice({
    name: "billing",

    initialState,

    reducers: {

        setInvoices(state, action) {
            state.invoices = action.payload;
        },

        setSelectedInvoice(state, action) {
            state.selectedInvoice = action.payload;
        },

        setLoading(state, action) {
            state.loading = action.payload;
        },

        setError(state, action) {
            state.error = action.payload;
        }

    }
});

export const {
    setInvoices,
    setSelectedInvoice,
    setLoading,
    setError
} = billingSlice.actions;

export default billingSlice.reducer;