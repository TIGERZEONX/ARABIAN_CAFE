import {
  LayoutDashboard,
  Receipt,
  Building2,
  Store,
  Users,
  BarChart3,
  Bell,
  Settings
} from "lucide-react";

export const SIDEBAR_MENU = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },

  {
    id: "billing",
    label: "Billing",
    icon: Receipt,
    children: [
      { label: "Dashboard", path: "/billing" },
      { label: "Invoice List", path: "/billing/invoices" },
      { label: "Create Invoice", path: "/billing/create" },
      { label: "Transactions", path: "/billing/transactions" },
      { label: "Payment History", path: "/billing/payments" }
    ]
  },

  {
    id: "menu-management",
    label: "Menu Management",
    icon: Store,
    path: "/menu-management"
  },


  {
    id: "branches",
    label: "Branches",
    icon: Building2,
    path: "/branches"
  },

  {
    id: "restaurants",
    label: "Restaurants",
    icon: Store,
    path: "/restaurants"
  },

  {
    id: "users",
    label: "Users",
    icon: Users,
    path: "/users"
  },

  {
    id: "inventory",
    label: "Inventory Stock",
    icon: Store,
    path: "/inventory"
  },
  {
    id: "profit-loss",
    label: "Profit & Loss",
    icon: BarChart3,
    path: "/profit-loss"
  },

  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    path: "/reports"
  },

  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    path: "/notifications"
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings"
  }
];