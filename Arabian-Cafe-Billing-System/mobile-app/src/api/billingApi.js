import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const billingApi = {
  createInvoice: (data) => {
    return apiClient.post(ENDPOINTS.BILLING.CREATE_INVOICE, data);
  },
  getBillingHistory: (params) => {
    return apiClient.get(ENDPOINTS.BILLING.HISTORY, params);
  },
  getInvoiceDetails: (id) => {
    return apiClient.get(`${ENDPOINTS.BILLING.BASE}/${id}`);
  }
};

export default billingApi;
