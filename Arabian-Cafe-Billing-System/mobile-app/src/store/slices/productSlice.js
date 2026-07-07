import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedProduct: null,

  search: "",
  selectedCategory: "All",

  loading: false,
  error: null,
};

const filterProducts = (state) => {
  let data = [...state.products];

  // Category Filter
  if (
    state.selectedCategory &&
    state.selectedCategory !== "All"
  ) {
    data = data.filter(
      (item) =>
        item.category === state.selectedCategory
    );
  }

  // Search Filter
  if (state.search.trim() !== "") {
    const keyword = state.search.toLowerCase();

    data = data.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.category
          .toLowerCase()
          .includes(keyword)
    );
  }

  state.filteredProducts = data;
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchProductsSuccess: (state, action) => {
      state.loading = false;

      state.products = action.payload;
      state.filteredProducts = action.payload;

      const categories = [
        "All",
        ...new Set(
          action.payload.map(
            (item) => item.category
          )
        ),
      ];

      state.categories = categories;
    },

    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
      filterProducts(state);
    },

    updateProduct: (state, action) => {
      const updatedProduct = action.payload;

      const index = state.products.findIndex(
        (item) => item.id === updatedProduct.id
      );

      if (index !== -1) {
        state.products[index] = updatedProduct;
      }

      filterProducts(state);
    },

    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );

      filterProducts(state);
    },

    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
      filterProducts(state);
    },

    clearSearch: (state) => {
      state.search = "";
      filterProducts(state);
    },

    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      filterProducts(state);
    },

    clearFilter: (state) => {
      state.search = "";
      state.selectedCategory = "All";
      state.filteredProducts = state.products;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,

  addProduct,
  updateProduct,
  deleteProduct,

  setSelectedProduct,
  clearSelectedProduct,

  setSearch,
  clearSearch,

  setCategory,
  clearFilter,
} = productSlice.actions;

export default productSlice.reducer;