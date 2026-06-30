import React from "react";
import {
  View,
  Text,
  Switch as RNSwitch,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

const Switch = ({
  label,
  value = false,
  onValueChange,
  disabled = false,
  thumbColor,
  trackColor,
  style = {},
  labelStyle = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      ) : null}

      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        thumbColor={
          thumbColor ||
          (value
            ? Theme.colors.primary
            : Theme.colors.white)
        }
        trackColor={
          trackColor || {
            false: Theme.colors.border,
            true: Theme.colors.lightCoffee,
          }
        }
        ios_backgroundColor={Theme.colors.border}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: Theme.spacing.md,
  },

  label: {
    flex: 1,

    fontSize: Theme.typography.fontSize.base,
    fontWeight: Theme.typography.fontWeight.medium,

    color: Theme.colors.textPrimary,

    marginRight: Theme.spacing.md,
  },
});

export default Switch;