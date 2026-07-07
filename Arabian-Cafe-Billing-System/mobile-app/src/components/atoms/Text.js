import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Text = ({
  children,
  variant = "body",
  color = Theme.colors.textPrimary,
  align = "left",
  style = {},
  numberOfLines,
  ellipsizeMode = "tail",
}) => {
  return (
    <RNText
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.base,
        styles[variant] || styles.body,
        {
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  // Base Style
  base: {
    color: Theme.colors.textPrimary,
    fontFamily: Theme.typography.fontFamily.regular,
  },

  // Heading 1
  heading1: {
    fontSize: Theme.typography.fontSize.display,
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.lineHeight.display,
  },

  // Heading 2
  heading2: {
    fontSize: Theme.typography.fontSize.xxl,
    fontWeight: Theme.typography.fontWeight.bold,
    lineHeight: Theme.typography.lineHeight.xl,
  },

  // Heading 3
  heading3: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.lineHeight.lg,
  },

  // Subtitle
  subtitle: {
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: Theme.typography.fontWeight.semiBold,
    lineHeight: Theme.typography.lineHeight.md,
  },

  // Body
  body: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.regular,
    lineHeight: Theme.typography.lineHeight.md,
  },

  // Small Body
  bodySmall: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.regular,
    lineHeight: Theme.typography.lineHeight.sm,
  },

  // Caption
  caption: {
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.regular,
    color: Theme.colors.textSecondary,
  },

  // Button Text
  button: {
    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.white,
  },

  // Price
  price: {
    fontSize: Theme.typography.fontSize.xl,
    fontWeight: Theme.typography.fontWeight.bold,
    color: Theme.colors.success,
  },

  // Error
  error: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.danger,
  },

  // Success
  success: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.success,
  },

  // Warning
  warning: {
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.medium,
    color: Theme.colors.warning,
  },
});

export default Text;