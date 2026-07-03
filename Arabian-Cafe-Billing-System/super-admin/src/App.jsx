import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import Dashboard from "./pages/Dashboard/Dashboard";
import MenuManagement from "./pages/MenuManagement/MenuManagement";
import Users from "./pages/Users";
import Inventory from "./pages/Inventory";
import ProfitLoss from "./pages/Inventory/ProfitLoss";
import BillingDashboard from "./pages/Billing/BillingDashboard";
import InvoiceList from "./pages/Billing/InvoiceList";
import CreateInvoice from "./pages/Billing/CreateInvoice";
import InvoiceDetails from "./pages/Billing/InvoiceDetails";
import Transactions from "./pages/Billing/Transactions";
import PaymentHistory from "./pages/Billing/PaymentHistory";

import GeneralSettings from "./pages/Settings/General";

import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* Protected/Dashboard Routes */}
        <Route element={<DashboardLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu-management" element={<MenuManagement />} />
          <Route path="/users" element={<Users />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />

          {/* Billing */}
          <Route path="/billing" element={<BillingDashboard />} />
          <Route path="/billing/invoices" element={<InvoiceList />} />
          <Route path="/billing/create" element={<CreateInvoice />} />
          <Route path="/billing/invoices/:id" element={<InvoiceDetails />} />
          <Route path="/billing/transactions" element={<Transactions />} />
          <Route path="/billing/payments" element={<PaymentHistory />} />

          {/* Settings */}
          <Route path="/settings" element={<GeneralSettings />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
