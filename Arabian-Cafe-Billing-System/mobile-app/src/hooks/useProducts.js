import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import productApi from "../api/productApi";

import {
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
} from "../store/slices/productSlice";

const useProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products
  );

  // ==========================
  // Load Products
  // ==========================

  const loadProducts = useCallback(
    async (params = {}) => {
      try {
        dispatch(fetchProductsStart());

        const response =
          await productApi.getProducts(params);

        dispatch(
          fetchProductsSuccess(response)
        );

        return response;
      } catch (error) {
        dispatch(
          fetchProductsFailure(
            error?.response?.data?.message ||
              error.message
          )
        );

        return [];
      }
    },
    [dispatch]
  );

  // ==========================
  // Refresh
  // ==========================

  const refreshProducts =
    useCallback(async () => {
      return await loadProducts();
    }, [loadProducts]);

  // ==========================
  // Create Product
  // ==========================

  const create = useCallback(
    async (product) => {
      const response =
        await productApi.createProduct(
          product
        );

      dispatch(addProduct(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Update Product
  // ==========================

  const update = useCallback(
    async (id, product) => {
      const response =
        await productApi.updateProduct(
          id,
          product
        );

      dispatch(updateProduct(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Delete Product
  // ==========================

  const remove = useCallback(
    async (id) => {
      await productApi.deleteProduct(id);

      dispatch(deleteProduct(id));
    },
    [dispatch]
  );

  // ==========================
  // Search
  // ==========================

  const search = useCallback(
    (text) => {
      dispatch(setSearch(text));
    },
    [dispatch]
  );

  const resetSearch =
    useCallback(() => {
      dispatch(clearSearch());
    }, [dispatch]);

  // ==========================
  // Category
  // ==========================

  const filterCategory =
    useCallback(
      (category) => {
        dispatch(setCategory(category));
      },
      [dispatch]
    );

  const resetFilter =
    useCallback(() => {
      dispatch(clearFilter());
    }, [dispatch]);

  // ==========================
  // Selected Product
  // ==========================

  const selectProduct =
    useCallback(
      (product) => {
        dispatch(
          setSelectedProduct(product)
        );
      },
      [dispatch]
    );

  const clearSelected =
    useCallback(() => {
      dispatch(clearSelectedProduct());
    }, [dispatch]);

  // ==========================
  // Get Product
  // ==========================

  const getProduct = useCallback(
    (id) => {
      return products.products.find(
        (item) => item.id === id
      );
    },
    [products.products]
  );

  return {
    ...products,

    loadProducts,
    refreshProducts,

    create,
    update,
    remove,

    search,
    resetSearch,

    filterCategory,
    resetFilter,

    selectProduct,
    clearSelected,

    getProduct,
  };
};

export default useProducts;