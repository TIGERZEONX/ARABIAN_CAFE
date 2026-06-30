import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

const Button = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={Theme.colors.white} />
      ) : (
        <Text
          style={[
            styles.text,
            variant === "outline" && styles.outlineText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingVertical: Theme.spacing.lg,
    paddingHorizontal: Theme.spacing.xl,

    borderRadius: Theme.spacing.radius.lg,

    ...Theme.shadows.small,
  },

  text: {
    fontSize: Theme.typography.button.fontSize,
    fontWeight: Theme.typography.button.fontWeight,
    color: Theme.colors.white,
  },

  disabled: {
    opacity: 0.5,
  },

  // Variants

  primary: {
    backgroundColor: Theme.colors.primary,
  },

  secondary: {
    backgroundColor: Theme.colors.accent,
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

  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },

  outlineText: {
    color: Theme.colors.primary,
  },

  // Sizes

  small: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  medium: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  large: {
    paddingVertical: 18,
    paddingHorizontal: 32,
  },
});

export default Button;