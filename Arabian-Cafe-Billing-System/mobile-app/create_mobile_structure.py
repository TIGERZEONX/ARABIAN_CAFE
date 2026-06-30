import os

# Root folder
ROOT = "mobile-app"

# Folder structure
folders = [
    "src",

    # Assets
    "src/assets/fonts",
    "src/assets/icons",
    "src/assets/images",
    "src/assets/logos",
    "src/assets/animations",

    # Components
    "src/components",

    # Atoms
    "src/components/atoms/Avatar",
    "src/components/atoms/Badge",
    "src/components/atoms/Button",
    "src/components/atoms/Card",
    "src/components/atoms/Divider",
    "src/components/atoms/Icon",
    "src/components/atoms/Input",
    "src/components/atoms/Label",
    "src/components/atoms/Loader",
    "src/components/atoms/Price",
    "src/components/atoms/Select",
    "src/components/atoms/Switch",
    "src/components/atoms/Text",
    "src/components/atoms/TextArea",

    # Molecules
    "src/components/molecules/BillItemRow",
    "src/components/molecules/CustomerForm",
    "src/components/molecules/MenuItemCard",
    "src/components/molecules/OrderSummary",
    "src/components/molecules/PaymentMethod",
    "src/components/molecules/PriceCard",
    "src/components/molecules/QuantitySelector",
    "src/components/molecules/SearchBar",
    "src/components/molecules/StatCard",
    "src/components/molecules/TableSelector",

    # Organisms
    "src/components/organisms/BillingTable",
    "src/components/organisms/BillSummary",
    "src/components/organisms/Cart",
    "src/components/organisms/DashboardStats",
    "src/components/organisms/Header",
    "src/components/organisms/PaymentPanel",
    "src/components/organisms/ProductGrid",
    "src/components/organisms/Sidebar",

    # Templates
    "src/components/templates/BillingLayout",
    "src/components/templates/DashboardLayout",
    "src/components/templates/LoginLayout",

    # Pages
    "src/components/pages/Billing",
    "src/components/pages/Customers",
    "src/components/pages/Dashboard",
    "src/components/pages/Inventory",
    "src/components/pages/Login",
    "src/components/pages/Orders",
    "src/components/pages/Reports",
    "src/components/pages/Settings",

    # Screens
    "src/screens",

    # Navigation
    "src/navigation",

    # API
    "src/api",

    # Services
    "src/services",

    # Hooks
    "src/hooks",

    # Store
    "src/store/slices",

    # Context
    "src/context",

    # Styles
    "src/styles",

    # Utils
    "src/utils",
]

# Files to create
files = [
    "src/App.js",

    # Navigation
    "src/navigation/AppNavigator.js",
    "src/navigation/AuthNavigator.js",
    "src/navigation/BottomTabNavigator.js",
    "src/navigation/DrawerNavigator.js",
    "src/navigation/RootNavigator.js",
    "src/navigation/index.js",

    # Screens
    "src/screens/SplashScreen.js",
    "src/screens/LoginScreen.js",
    "src/screens/DashboardScreen.js",
    "src/screens/BillingScreen.js",
    "src/screens/OrdersScreen.js",
    "src/screens/InventoryScreen.js",
    "src/screens/CustomersScreen.js",
    "src/screens/ReportsScreen.js",
    "src/screens/SettingsScreen.js",

    # API
    "src/api/apiClient.js",
    "src/api/authApi.js",
    "src/api/billingApi.js",
    "src/api/customerApi.js",
    "src/api/inventoryApi.js",
    "src/api/orderApi.js",
    "src/api/endpoints.js",

    # Services
    "src/services/authService.js",
    "src/services/billingService.js",
    "src/services/customerService.js",
    "src/services/inventoryService.js",
    "src/services/orderService.js",
    "src/services/printService.js",
    "src/services/storageService.js",

    # Hooks
    "src/hooks/useAuth.js",
    "src/hooks/useBilling.js",
    "src/hooks/useCustomers.js",
    "src/hooks/useInventory.js",
    "src/hooks/useOrders.js",
    "src/hooks/useTheme.js",
    "src/hooks/useDebounce.js",

    # Store
    "src/store/store.js",
    "src/store/index.js",
    "src/store/slices/authSlice.js",
    "src/store/slices/billingSlice.js",
    "src/store/slices/customerSlice.js",
    "src/store/slices/inventorySlice.js",
    "src/store/slices/orderSlice.js",
    "src/store/slices/productSlice.js",
    "src/store/slices/uiSlice.js",

    # Context
    "src/context/AuthContext.js",
    "src/context/BillingContext.js",
    "src/context/ThemeContext.js",
    "src/context/UserContext.js",

    # Styles
    "src/styles/colors.js",
    "src/styles/fonts.js",
    "src/styles/shadows.js",
    "src/styles/spacing.js",
    "src/styles/theme.js",
    "src/styles/typography.js",

    # Utils
    "src/utils/constants.js",
    "src/utils/formatter.js",
    "src/utils/helpers.js",
    "src/utils/storage.js",
    "src/utils/validators.js",

    # Root
    "package.json",
    "app.json",
    "babel.config.js",
    "metro.config.js",
    ".gitignore",
    "README.md",
    "global.css",
]

# Create folders
for folder in folders:
    os.makedirs(os.path.join(ROOT, folder), exist_ok=True)

# Create files
for file in files:
    filepath = os.path.join(ROOT, file)
    os.makedirs(os.path.dirname(filepath), exist_ok=True)

    if not os.path.exists(filepath):
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("")

# Create index.js in Atomic Design folders
index_dirs = [
    "src/components/atoms",
    "src/components/molecules",
    "src/components/organisms",
    "src/components/templates",
    "src/components/pages",
]

for folder in index_dirs:
    path = os.path.join(ROOT, folder, "index.js")
    if not os.path.exists(path):
        with open(path, "w", encoding="utf-8") as f:
            f.write("")

print("=" * 50)
print("✅ ArabianCafe Mobile App Structure Created Successfully!")
print(f"📁 Root Folder: {ROOT}")