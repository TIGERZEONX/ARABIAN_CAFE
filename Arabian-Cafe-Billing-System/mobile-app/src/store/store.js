import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import customerReducer from "./slices/customerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productReducer,
    orders: orderReducer,
    customers: customerReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: __DEV__,
});

export default store;