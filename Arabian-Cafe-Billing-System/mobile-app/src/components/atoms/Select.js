import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Theme from "../../styles/theme";

const Select = ({
  label,
  selectedValue,
  onValueChange,
  items = [],
  placeholder = "Select",
  enabled = true,
  error = "",
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <View
        style={[
          styles.pickerContainer,
          error ? styles.errorBorder : null,
          !enabled ? styles.disabled : null,
        ]}
      >
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          enabled={enabled}
          dropdownIconColor={Theme.colors.primary}
          style={styles.picker}
        >
          <Picker.Item
            label={placeholder}
            value=""
          />

          {items.map((item, index) => (
            <Picker.Item
              key={index}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: Theme.spacing.lg,
  },

  label: {
    marginBottom: Theme.spacing.sm,
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
  },

  pickerContainer: {
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.spacing.radius.md,
    overflow: "hidden",
  },

  picker: {
    color: Theme.colors.textPrimary,
  },

  errorBorder: {
    borderColor: Theme.colors.danger,
  },

  disabled: {
    opacity: 0.6,
  },

  error: {
    marginTop: Theme.spacing.xs,
    color: Theme.colors.danger,
    fontSize: Theme.typography.fontSize.sm,
  },
});

export default Select;