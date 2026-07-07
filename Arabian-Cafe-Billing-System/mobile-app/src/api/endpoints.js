export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  INVENTORY: {
    BASE: '/inventory',
    PRODUCTS: '/inventory/products',
    CATEGORIES: '/inventory/categories',
  },
  BILLING: {
    BASE: '/billing',
    CREATE_INVOICE: '/billing/invoice',
    HISTORY: '/billing/history',
  },
  CUSTOMERS: {
    BASE: '/customers',
  },
  ORDERS: {
    BASE: '/orders',
  }
};

export default ENDPOINTS;
