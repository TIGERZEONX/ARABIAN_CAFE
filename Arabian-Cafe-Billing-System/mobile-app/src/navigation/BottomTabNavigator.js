import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Theme from "../styles/theme";

import Dashboard from "../components/pages/Dashboard";
import Billing from "../components/pages/Billing";
import Orders from "../components/pages/Orders";
import Reports from "../components/pages/Reports";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor:
          Theme.colors.textSecondary,

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: Theme.colors.surface,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.border,
        },

        tabBarLabelStyle: {
          fontSize: Theme.typography.fontSize.sm,
          fontWeight:
            Theme.typography.fontWeight.semiBold,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Dashboard":
              iconName = "dashboard";
              break;

            case "Billing":
              iconName = "receipt-long";
              break;

            case "Orders":
              iconName = "shopping-bag";
              break;

            case "Reports":
              iconName = "bar-chart";
              break;

            default:
              iconName = "circle";
          }

          return (
            <MaterialIcons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
      />

      <Tab.Screen
        name="Billing"
        component={Billing}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
      />

      <Tab.Screen
        name="Reports"
        component={Reports}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;