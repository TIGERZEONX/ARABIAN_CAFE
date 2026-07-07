import React, { createContext, useState, useContext } from 'react';

const BillingContext = createContext();

export const BillingProvider = ({ children }) => {
  const [currentBill, setCurrentBill] = useState(null);

  const clearBill = () => {
    setCurrentBill(null);
  };

  return (
    <BillingContext.Provider value={{ currentBill, setCurrentBill, clearBill }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = () => useContext(BillingContext);

export default BillingContext;
