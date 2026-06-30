import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Text from "../atoms/Text";
import Icon from "../atoms/Icon";

const QuantitySelector = ({
  value = 1,
  min = 1,
  max = 99,
  step = 1,
  onChange,
  size = "medium",
  disabled = false,
  style = {},
}) => {
  const increase = () => {
    if (disabled) return;

    const newValue = value + step;

    if (newValue <= max) {
      onChange?.(newValue);
    }
  };

  const decrease = () => {
    if (disabled) return;

    const newValue = value - step;

    if (newValue >= min) {
      onChange?.(newValue);
    }
  };

  return (
    <View
      style={[
        styles.container,
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={decrease}
        disabled={disabled || value <= min}
        style={[
          styles.button,
          value <= min && styles.buttonDisabled,
        ]}
      >
        <Icon
          name="remove"
          size={18}
          color={
            value <= min
              ? Theme.colors.textSecondary
              : Theme.colors.primary
          }
        />
      </TouchableOpacity>

      <Text
        variant="subtitle"
        style={styles.value}
      >
        {value}
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={increase}
        disabled={disabled || value >= max}
        style={[
          styles.button,
          value >= max && styles.buttonDisabled,
        ]}
      >
        <Icon
          name="add"
          size={18}
          color={
            value >= max
              ? Theme.colors.textSecondary
              : Theme.colors.primary
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.spacing.radius.lg,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    ...Theme.shadows.small,
  },

  small: {
    width: 110,
    height: 40,
  },

  medium: {
    width: 130,
    height: 46,
  },

  large: {
    width: 150,
    height: 54,
  },

  button: {
    width: 40,
    height: "100%",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: Theme.colors.lightCoffee,
  },

  buttonDisabled: {
    backgroundColor: Theme.colors.background,
  },

  value: {
    flex: 1,
    textAlign: "center",
  },

  disabled: {
    opacity: 0.6,
  },
});

export default QuantitySelector;