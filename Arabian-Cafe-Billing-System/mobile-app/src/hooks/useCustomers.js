import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import customerApi from "../api/customerApi";

import {
  fetchCustomersStart,
  fetchCustomersSuccess,
  fetchCustomersFailure,

  addCustomer,
  updateCustomer,
  deleteCustomer,

  setSelectedCustomer,
  clearSelectedCustomer,

  setCustomerSearch,
  clearCustomerSearch,

  updateLoyalty,

  clearCustomerError,
} from "../store/slices/customerSlice";

const useCustomers = () => {
  const dispatch = useDispatch();

  const customers = useSelector(
    (state) => state.customers
  );

  // ==========================
  // Load Customers
  // ==========================

  const loadCustomers = useCallback(
    async (params = {}) => {
      try {
        dispatch(fetchCustomersStart());

        const response =
          await customerApi.getCustomers(params);

        dispatch(
          fetchCustomersSuccess(response)
        );

        return response;
      } catch (error) {
        dispatch(
          fetchCustomersFailure(
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

  const refreshCustomers =
    useCallback(async () => {
      return await loadCustomers();
    }, [loadCustomers]);

  // ==========================
  // Create Customer
  // ==========================

  const create = useCallback(
    async (customer) => {
      const response =
        await customerApi.createCustomer(
          customer
        );

      dispatch(addCustomer(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Update Customer
  // ==========================

  const update = useCallback(
    async (id, customer) => {
      const response =
        await customerApi.updateCustomer(
          id,
          customer
        );

      dispatch(updateCustomer(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Delete Customer
  // ==========================

  const remove = useCallback(
    async (id) => {
      await customerApi.deleteCustomer(id);

      dispatch(deleteCustomer(id));
    },
    [dispatch]
  );

  // ==========================
  // Search
  // ==========================

  const search = useCallback(
    (keyword) => {
      dispatch(setCustomerSearch(keyword));
    },
    [dispatch]
  );

  const clearSearch =
    useCallback(() => {
      dispatch(clearCustomerSearch());
    }, [dispatch]);

  // ==========================
  // Selected Customer
  // ==========================

  const selectCustomer =
    useCallback(
      (customer) => {
        dispatch(
          setSelectedCustomer(customer)
        );
      },
      [dispatch]
    );

  const clearSelected =
    useCallback(() => {
      dispatch(
        clearSelectedCustomer()
      );
    }, [dispatch]);

  // ==========================
  // Loyalty
  // ==========================

  const changeLoyalty =
    useCallback(
      async (
        id,
        loyaltyData
      ) => {
        const response =
          await customerApi.updateLoyalty(
            id,
            loyaltyData
          );

        dispatch(
          updateLoyalty({
            id,
            loyalty:
              response.loyalty,
          })
        );

        return response;
      },
      [dispatch]
    );

  // ==========================
  // Purchase History
  // ==========================

  const getPurchaseHistory =
    useCallback(async (id) => {
      return await customerApi.getPurchaseHistory(
        id
      );
    }, []);

  // ==========================
  // Top Customers
  // ==========================

  const getTopCustomers =
    useCallback(async () => {
      return await customerApi.getTopCustomers();
    }, []);

  // ==========================
  // Get Customer
  // ==========================

  const getCustomer =
    useCallback(
      (id) => {
        return customers.customers.find(
          (item) =>
            item.id === id
        );
      },
      [customers.customers]
    );

  // ==========================
  // Clear Error
  // ==========================

  const clearError =
    useCallback(() => {
      dispatch(
        clearCustomerError()
      );
    }, [dispatch]);

  return {
    ...customers,

    loadCustomers,
    refreshCustomers,

    create,
    update,
    remove,

    search,
    clearSearch,

    selectCustomer,
    clearSelected,

    changeLoyalty,

    getPurchaseHistory,
    getTopCustomers,

    getCustomer,

    clearError,
  };
};

export default useCustomers;