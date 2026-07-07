import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import billingService from '../services/billingService';
import { setLoading, setError, setHistory, setCurrentInvoice } from '../store/slices/billingSlice';

export const useBilling = () => {
  const dispatch = useDispatch();
  
  // Make sure you have added billingReducer to your store.js for this to work!
  const { currentInvoice, history, isLoading, error } = useSelector((state) => state.billing || {}); 

  const processPayment = useCallback(async (billingData) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await billingService.processPayment(billingData);
      dispatch(setCurrentInvoice(response));
      return response;
    } catch (err) {
      dispatch(setError(err.message || 'Payment failed'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchHistory = useCallback(async (page = 1) => {
    dispatch(setLoading(true));
    try {
      const data = await billingService.getHistory(page);
      dispatch(setHistory(data));
    } catch (err) {
      dispatch(setError(err.message || 'Failed to fetch history'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    currentInvoice,
    history,
    isLoading,
    error,
    processPayment,
    fetchHistory,
  };
};

export default useBilling;
