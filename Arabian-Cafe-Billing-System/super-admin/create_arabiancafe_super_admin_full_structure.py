
from pathlib import Path

ROOT = Path("super-admin")

folders = [
"public/images","public/icons","public/logos",

"src/assets/images",
"src/assets/icons",
"src/assets/fonts",
"src/assets/styles",

"src/components/atoms/Button",
"src/components/atoms/Input",
"src/components/atoms/Card",
"src/components/atoms/Badge",
"src/components/atoms/Avatar",
"src/components/atoms/Icon",
"src/components/atoms/Typography",
"src/components/atoms/Loader",

"src/components/molecules/SearchBar",
"src/components/molecules/TableRow",
"src/components/molecules/FilterBar",
"src/components/molecules/FormField",
"src/components/molecules/Pagination",
"src/components/molecules/StatusCard",

"src/components/organisms/Sidebar",
"src/components/organisms/Header",
"src/components/organisms/Navbar",
"src/components/organisms/DashboardStats",
"src/components/organisms/BillingTable",
"src/components/organisms/RevenueChart",
"src/components/organisms/UserManagement",
"src/components/organisms/BranchTable",
"src/components/organisms/SettingsForm",

"src/components/templates/DashboardTemplate",
"src/components/templates/AuthTemplate",
"src/components/templates/ReportTemplate",
"src/components/templates/SettingsTemplate",

"src/components/shared/Modal",
"src/components/shared/Toast",
"src/components/shared/EmptyState",
"src/components/shared/ConfirmDialog",

"src/pages/Dashboard",
"src/pages/Billing",
"src/pages/Branches",
"src/pages/Restaurants",
"src/pages/Users",
"src/pages/Reports",
"src/pages/Subscription",
"src/pages/Notifications",
"src/pages/Settings",
"src/pages/Auth",
"src/pages/NotFound",

"src/layouts",
"src/routes",
"src/services",
"src/hooks",

"src/store/slices",
"src/store/actions",
"src/store/reducers",

"src/context",
"src/constants",
"src/utils",
"src/theme",
]

files = [
"public/favicon.ico",

"src/App.jsx",
"src/main.jsx",

"src/pages/Dashboard/Dashboard.jsx",

"src/pages/Billing/InvoiceList.jsx",
"src/pages/Billing/Transactions.jsx",
"src/pages/Billing/PaymentHistory.jsx",

"src/pages/Branches/BranchList.jsx",
"src/pages/Branches/AddBranch.jsx",

"src/pages/Restaurants/CafeList.jsx",
"src/pages/Restaurants/CafeDetails.jsx",

"src/pages/Users/Admins.jsx",
"src/pages/Users/Staff.jsx",
"src/pages/Users/Roles.jsx",

"src/pages/Reports/SalesReport.jsx",
"src/pages/Reports/RevenueReport.jsx",
"src/pages/Reports/TaxReport.jsx",

"src/pages/Subscription/Plans.jsx",
"src/pages/Subscription/BillingCycle.jsx",

"src/pages/Notifications/Notifications.jsx",

"src/pages/Settings/General.jsx",
"src/pages/Settings/Security.jsx",
"src/pages/Settings/Theme.jsx",
"src/pages/Settings/Integrations.jsx",

"src/pages/Auth/Login.jsx",
"src/pages/Auth/ForgotPassword.jsx",
"src/pages/Auth/ResetPassword.jsx",

"src/pages/NotFound/NotFound.jsx",

"src/layouts/DashboardLayout.jsx",
"src/layouts/AuthLayout.jsx",
"src/layouts/BlankLayout.jsx",

"src/routes/AppRoutes.jsx",
"src/routes/PrivateRoute.jsx",
"src/routes/routeConfig.js",

"src/services/api.js",
"src/services/authService.js",
"src/services/billingService.js",
"src/services/reportService.js",
"src/services/branchService.js",

"src/hooks/useAuth.js",
"src/hooks/usePagination.js",
"src/hooks/useDebounce.js",
"src/hooks/useApi.js",

"src/store/index.js",

"src/context/AuthContext.jsx",
"src/context/ThemeContext.jsx",

"src/constants/colors.js",
"src/constants/apiRoutes.js",
"src/constants/roles.js",

"src/utils/formatCurrency.js",
"src/utils/formatDate.js",
"src/utils/validators.js",
"src/utils/helpers.js",

"src/theme/colors.js",
"src/theme/typography.js",
"src/theme/spacing.js",
"src/theme/index.js",

".env",
"package.json",
"vite.config.js",
"README.md",
]

for folder in folders:
    (ROOT / folder).mkdir(parents=True, exist_ok=True)

for file in files:
    p = ROOT / file
    p.parent.mkdir(parents=True, exist_ok=True)
    p.touch(exist_ok=True)

print(f"Created {ROOT}")
