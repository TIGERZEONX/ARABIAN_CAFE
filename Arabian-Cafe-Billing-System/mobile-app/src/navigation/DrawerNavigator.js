import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import BottomTabNavigator from "./BottomTabNavigator";

import Dashboard from "../components/pages/Dashboard";
import Billing from "../components/pages/Billing";
import Orders from "../components/pages/Orders";
import Inventory from "../components/pages/Inventory";
import Customers from "../components/pages/Customers";
import Reports from "../components/pages/Reports";
import Settings from "../components/pages/Settings";

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
        component={Dashboard}
      />

      <Drawer.Screen
        name="Billing"
        component={Billing}
      />

      <Drawer.Screen
        name="Orders"
        component={Orders}
      />

      <Drawer.Screen
        name="Inventory"
        component={Inventory}
      />

      <Drawer.Screen
        name="Customers"
        component={Customers}
      />

      <Drawer.Screen
        name="Reports"
        component={Reports}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
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