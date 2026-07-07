import axios from "axios";

// ==============================
// Base URL
// ==============================

// Development
const DEV_BASE_URL = "http://192.168.0.13:5000/api";


// Production
const PROD_BASE_URL = "https://your-domain.com/api";

const api = axios.create({
  baseURL: __DEV__ ? DEV_BASE_URL : PROD_BASE_URL,

  timeout: 15000,

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// ==============================
// Request Interceptor
// ==============================

api.interceptors.request.use(
  async (config) => {
    // Example:
    // const token = await AsyncStorage.getItem("token");
    //
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

// ==============================
// Response Interceptor
// ==============================

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      console.log(
        "API Error:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.log("Network Error");
    } else {
      console.log(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;