import { Outlet } from "react-router-dom";

import Sidebar from "../components/organisms/Sidebar/Sidebar";

import "./DashboardLayout.css";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}