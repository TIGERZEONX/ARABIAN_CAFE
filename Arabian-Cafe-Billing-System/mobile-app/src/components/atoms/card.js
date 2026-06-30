import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Card = ({
  children,
  onPress = null,
  style = {},
  padding = true,
  elevation = "medium",
  radius = Theme.spacing.radius.xxl,
  backgroundColor = Theme.colors.surface,
}) => {
  const Component = onPress ? Pressable : View;

  return (
    <Component
      onPress={onPress}
      android_ripple={
        onPress
          ? {
              color: "rgba(0,0,0,0.08)",
              borderless: false,
            }
          : undefined
      }
      style={[
        styles.card,
        styles[elevation] || styles.medium,
        padding && styles.padding,
        {
          borderRadius: radius,
          backgroundColor: backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: Theme.colors.surface,
  },

  padding: {
    padding: Theme.spacing.xl,
  },

  small: {
    ...Theme.shadows.small,
  },

  medium: {
    ...Theme.shadows.medium,
  },

  large: {
    ...Theme.shadows.large,
  },

  extraLarge: {
    ...Theme.shadows.extraLarge,
  },
});

export default Card;