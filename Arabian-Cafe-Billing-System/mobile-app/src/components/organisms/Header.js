import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Theme from "../../styles/theme";

import Text from "../atoms/Text";
import Icon from "../atoms/Icon";
import Avatar from "../atoms/Avatar";

const Header = ({
  title = "ArabianCafe",
  subtitle = "",

  showMenu = true,
  showNotification = true,
  showProfile = true,

  profileName = "Admin",
  profileImage = null,

  onMenuPress,
  onNotificationPress,
  onProfilePress,

  rightComponent = null,

  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {/* Left Section */}
      <View style={styles.leftSection}>
        {showMenu && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onMenuPress}
            style={styles.iconButton}
          >
            <Icon
              name="menu"
              size={28}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
        )}

        <View style={styles.titleContainer}>
          <Text
            variant="heading3"
            color={Theme.colors.white}
          >
            {title}
          </Text>

          {subtitle ? (
            <Text
              variant="caption"
              color={Theme.colors.lightCoffee}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.rightSection}>
        {rightComponent}

        {showNotification && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onNotificationPress}
            style={styles.iconButton}
          >
            <Icon
              name="notifications"
              size={24}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
        )}

        {showProfile && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onProfilePress}
          >
            <Avatar
              source={profileImage}
              name={profileName}
              size="small"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.lg,

    backgroundColor: Theme.colors.primary,

    borderBottomLeftRadius: Theme.spacing.radius.xxl,
    borderBottomRightRadius: Theme.spacing.radius.xxl,

    ...Theme.shadows.medium,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  titleContainer: {
    marginLeft: Theme.spacing.md,
  },

  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconButton: {
    marginHorizontal: Theme.spacing.sm,
  },
});

export default Header;