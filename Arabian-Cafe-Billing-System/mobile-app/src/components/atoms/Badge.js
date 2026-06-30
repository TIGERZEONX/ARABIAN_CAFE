import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Badge = ({
  title,
  variant = "primary",
  size = "medium",
  rounded = true,
  style = {},
  textStyle = {},
}) => {
  return (
    <View
      style={[
        styles.badge,
        styles[variant] || styles.primary,
        styles[size] || styles.medium,
        rounded && styles.rounded,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${size}Text`] || styles.mediumText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
  },

  rounded: {
    borderRadius: Theme.spacing.radius.circle,
  },

  // ======================
  // Variants
  // ======================

  primary: {
    backgroundColor: Theme.colors.primary,
  },

  secondary: {
    backgroundColor: Theme.colors.secondary,
  },

  success: {
    backgroundColor: Theme.colors.success,
  },

  danger: {
    backgroundColor: Theme.colors.danger,
  },

  warning: {
    backgroundColor: Theme.colors.warning,
  },

  info: {
    backgroundColor: Theme.colors.info,
  },

  light: {
    backgroundColor: Theme.colors.lightCoffee,
  },

  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },

  // ======================
  // Sizes
  // ======================

  small: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  medium: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  large: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  // ======================
  // Text
  // ======================

  text: {
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.white,
  },

  smallText: {
    fontSize: Theme.typography.fontSize.sm,
  },

  mediumText: {
    fontSize: Theme.typography.fontSize.md,
  },

  largeText: {
    fontSize: Theme.typography.fontSize.base,
  },
});

export default Badge;