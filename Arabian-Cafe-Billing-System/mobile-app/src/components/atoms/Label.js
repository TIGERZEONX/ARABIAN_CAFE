import React from "react";
import { Text, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Label = ({
  children,
  required = false,
  color = Theme.colors.textPrimary,
  size = "md",
  weight = "semiBold",
  align = "left",
  style = {},
}) => {
  return (
    <Text
      style={[
        styles.label,
        {
          color,
          textAlign: align,
          fontSize: Theme.typography.fontSize[size],
          fontWeight: Theme.typography.fontWeight[weight],
        },
        style,
      ]}
    >
      {children}
      {required && (
        <Text style={styles.required}> *</Text>
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: Theme.spacing.sm,
  },

  required: {
    color: Theme.colors.danger,
  },
});

export default Label;