import billingApi from '../api/billingApi';

export const billingService = {
  processPayment: async (billingData) => {
    try {
      // Add business logic/validation here before calling API
      if (!billingData.items || billingData.items.length === 0) {
        throw new Error('No items to bill');
      }
      
      const response = await billingApi.createInvoice({
        ...billingData,
        timestamp: new Date().toISOString(),
      });
      
      return response;
    } catch (error) {
      console.error('Billing Service Error:', error);
      throw error; // Re-throw to be handled by the UI or Redux slice
    }
  },

  getHistory: async (page = 1, limit = 10) => {
    try {
      return await billingApi.getBillingHistory({ page, limit });
    } catch (error) {
      console.error('Fetch History Error:', error);
      throw error;
    }
  }
};

export default billingService;
