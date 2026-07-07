import { configureStore } from '@reduxjs/toolkit';

// Import existing slices
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import customerReducer from './slices/customerSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';

// Import these when you create them
// import billingReducer from './slices/billingSlice';
// import inventoryReducer from './slices/inventorySlice';
// import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    customers: customerReducer,
    orders: orderReducer,
    products: productReducer,
    // billing: billingReducer,
    // inventory: inventoryReducer,
    // ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Often useful in React Native for things like navigation objects
    }),
});

export default store;
