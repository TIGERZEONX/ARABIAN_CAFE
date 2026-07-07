import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./BottomTabNavigator";

import { DashboardScreen, BillingScreen, OrdersScreen, InventoryScreen, CustomersScreen, ReportsScreen, SettingsScreen } from "../screens";

import Theme from "../styles/theme";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,

        drawerType: "front",

        drawerStyle: {
          width: 280,
          backgroundColor: Theme.colors.background,
        },

        drawerActiveTintColor: Theme.colors.primary,
        drawerInactiveTintColor: Theme.colors.textSecondary,

        drawerActiveBackgroundColor:
          Theme.colors.lightCoffee,

        drawerLabelStyle: {
          fontSize: Theme.typography.fontSize.md,
          fontWeight:
            Theme.typography.fontWeight.semiBold,
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Drawer.Screen
        name="Billing"
        component={BillingScreen}
      />

      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
      />

      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
      />

      <Drawer.Screen
        name="Customers"
        component={CustomersScreen}
      />

      <Drawer.Screen
        name="Reports"
        component={ReportsScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      {/* Optional Bottom Tabs */}

      <Drawer.Screen
        name="POS"
        component={BottomTabNavigator}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;