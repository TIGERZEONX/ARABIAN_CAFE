import api from "./api";

const BASE = "/billing";

// Place checkout / generate bill
export const createInvoice = (data) =>
    api.post(`${BASE}`, data);

// Get transaction details by ID
export const getInvoice = (id) =>
    api.get(`${BASE}/${id}`);

// Get paginated/filtered list of past invoices
export const getInvoices = (params) =>
    api.get(`${BASE}/history`, { params });

// Legacy/Fallback aliases (in case other components import these)
export const getTransactions = () => api.get(`${BASE}/history`);
export const getPayments = () => api.get(`${BASE}/history`);
