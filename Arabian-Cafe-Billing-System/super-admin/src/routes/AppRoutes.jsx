import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import BillingDashboard from "../pages/Billing/BillingDashboard";
import InvoiceList from "../pages/Billing/InvoiceList";
import CreateInvoice from "../pages/Billing/CreateInvoice";
import Transactions from "../pages/Billing/Transactions";
import PaymentHistory from "../pages/Billing/PaymentHistory";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/billing" replace />} />

        <Route path="/billing" element={<BillingDashboard />} />
        <Route path="/billing/invoices" element={<InvoiceList />} />
        <Route path="/billing/create" element={<CreateInvoice />} />
        <Route path="/billing/transactions" element={<Transactions />} />
        <Route path="/billing/payments" element={<PaymentHistory />} />
      </Route>
    </Routes>
  );
}