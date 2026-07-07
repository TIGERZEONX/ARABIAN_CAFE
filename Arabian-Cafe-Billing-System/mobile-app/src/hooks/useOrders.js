import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import orderApi from "../api/orderApi";

import {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,

  setCurrentOrder,
  clearCurrentOrder,

  addOrder,
  updateOrder,
  deleteOrder,

  updateOrderStatus,
  updatePaymentStatus,

  setFilterStatus,
  clearFilterStatus,

  clearOrderError,
} from "../store/slices/orderSlice";

const useOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders
  );

  // ==========================
  // Load Orders
  // ==========================

  const loadOrders = useCallback(
    async (params = {}) => {
      try {
        dispatch(fetchOrdersStart());

        const response =
          await orderApi.getOrders(params);

        dispatch(
          fetchOrdersSuccess(response)
        );

        return response;
      } catch (error) {
        dispatch(
          fetchOrdersFailure(
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
  // Create Order
  // ==========================

  const create = useCallback(
    async (order) => {
      const response =
        await orderApi.createOrder(order);

      dispatch(addOrder(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Update Order
  // ==========================

  const update = useCallback(
    async (id, order) => {
      const response =
        await orderApi.updateOrder(
          id,
          order
        );

      dispatch(updateOrder(response));

      return response;
    },
    [dispatch]
  );

  // ==========================
  // Delete Order
  // ==========================

  const remove = useCallback(
    async (id) => {
      await orderApi.deleteOrder(id);

      dispatch(deleteOrder(id));
    },
    [dispatch]
  );

  // ==========================
  // Current Order
  // ==========================

  const selectOrder = useCallback(
    (order) => {
      dispatch(setCurrentOrder(order));
    },
    [dispatch]
  );

  const clearSelectedOrder =
    useCallback(() => {
      dispatch(clearCurrentOrder());
    }, [dispatch]);

  // ==========================
  // Order Status
  // ==========================

  const changeStatus =
    useCallback(
      async (id, status) => {
        await orderApi.updateOrderStatus(
          id,
          status
        );

        dispatch(
          updateOrderStatus({
            id,
            status,
          })
        );
      },
      [dispatch]
    );

  // ==========================
  // Payment Status
  // ==========================

  const changePaymentStatus =
    useCallback(
      async (
        id,
        paymentStatus
      ) => {
        await orderApi.updatePaymentStatus(
          id,
          paymentStatus
        );

        dispatch(
          updatePaymentStatus({
            id,
            paymentStatus,
          })
        );
      },
      [dispatch]
    );

  // ==========================
  // Reports
  // ==========================

  const getTodaySales =
    useCallback(async () => {
      return await orderApi.getTodaySales();
    }, []);

  const getWeeklySales =
    useCallback(async () => {
      return await orderApi.getWeeklySales();
    }, []);

  const getMonthlySales =
    useCallback(async () => {
      return await orderApi.getMonthlySales();
    }, []);

  const getDashboard =
    useCallback(async () => {
      return await orderApi.getDashboardSummary();
    }, []);

  // ==========================
  // Bill
  // ==========================

  const generateBill =
    useCallback(async (id) => {
      return await orderApi.generateBill(
        id
      );
    }, []);

  // ==========================
  // Filter
  // ==========================

  const filterStatus =
    useCallback(
      (status) => {
        dispatch(
          setFilterStatus(status)
        );
      },
      [dispatch]
    );

  const clearFilter =
    useCallback(() => {
      dispatch(clearFilterStatus());
    }, [dispatch]);

  // ==========================
  // Error
  // ==========================

  const clearError =
    useCallback(() => {
      dispatch(clearOrderError());
    }, [dispatch]);

  return {
    ...orders,

    loadOrders,

    create,
    update,
    remove,

    selectOrder,
    clearSelectedOrder,

    changeStatus,
    changePaymentStatus,

    generateBill,

    getTodaySales,
    getWeeklySales,
    getMonthlySales,
    getDashboard,

    filterStatus,
    clearFilter,

    clearError,
  };
};

export default useOrders;