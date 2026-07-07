import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Avatar from "../atoms/Avatar";
import Icon from "../atoms/Icon";
import Text from "../atoms/Text";
import Divider from "../atoms/Divider";

const defaultMenu = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "dashboard",
  },
  {
    id: "billing",
    title: "Billing",
    icon: "receipt-long",
  },
  {
    id: "orders",
    title: "Orders",
    icon: "shopping-bag",
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: "inventory",
  },
  {
    id: "customers",
    title: "Customers",
    icon: "people",
  },
  {
    id: "reports",
    title: "Reports",
    icon: "bar-chart",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "settings",
  },
];

const Sidebar = ({
  userName = "Administrator",
  userRole = "Manager",
  profileImage = null,

  activeScreen = "dashboard",

  menuItems = defaultMenu,

  onMenuPress,
  onLogout,

  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Header */}

      <View style={styles.header}>
        <Avatar
          source={profileImage}
          name={userName}
          size="large"
        />

        <Text
          variant="heading3"
          color={Theme.colors.white}
          align="center"
          style={styles.name}
        >
          {userName}
        </Text>

        <Text
          variant="caption"
          color={Theme.colors.lightCoffee}
        >
          {userRole}
        </Text>
      </View>

      <Divider />

      {/* Menu */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menu}
      >
        {menuItems.map((item) => {
          const selected =
            activeScreen === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onMenuPress?.(item)}
              style={[
                styles.menuItem,
                selected && styles.activeMenu,
              ]}
            >
              <Icon
                name={item.icon}
                size={24}
                color={
                  selected
                    ? Theme.colors.primary
                    : Theme.colors.white
                }
              />

              <Text
                variant="subtitle"
                color={
                  selected
                    ? Theme.colors.primary
                    : Theme.colors.white
                }
                style={styles.menuText}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Footer */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onLogout}
        style={styles.logoutButton}
      >
        <Icon
          name="logout"
          size={24}
          color={Theme.colors.white}
        />

        <Text
          variant="subtitle"
          color={Theme.colors.white}
          style={styles.menuText}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    flex: 1,

    backgroundColor: Theme.colors.primary,

    paddingTop: Theme.spacing.xxxl,
    paddingHorizontal: Theme.spacing.lg,
  },

  header: {
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },

  name: {
    marginTop: Theme.spacing.md,
  },

  menu: {
    paddingVertical: Theme.spacing.lg,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,

    marginBottom: Theme.spacing.sm,

    borderRadius: Theme.spacing.radius.lg,
  },

  activeMenu: {
    backgroundColor: Theme.colors.white,
  },

  menuText: {
    marginLeft: Theme.spacing.md,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: Theme.spacing.lg,

    borderTopWidth: 1,
    borderTopColor: Theme.colors.secondary,
  },
});

export default Sidebar;