import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

const TextArea = ({
  label,
  value,
  onChangeText,
  placeholder = "Enter text...",
  numberOfLines = 5,
  editable = true,
  error = "",
  maxLength,
  style = {},
  inputStyle = {},
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={styles.label}>
          {label}
        </Text>
      ) : null}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.textSecondary}
        editable={editable}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        textAlignVertical="top"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && styles.focused,
          error && styles.errorBorder,
          !editable && styles.disabled,
          inputStyle,
        ]}
      />

      {maxLength ? (
        <Text style={styles.counter}>
          {(value || "").length}/{maxLength}
        </Text>
      ) : null}

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

  input: {
    minHeight: 120,

    padding: Theme.spacing.lg,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    borderRadius: Theme.spacing.radius.md,

    backgroundColor: Theme.colors.surface,

    color: Theme.colors.textPrimary,

    fontSize: Theme.typography.fontSize.base,
  },

  focused: {
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },

  errorBorder: {
    borderColor: Theme.colors.danger,
  },

  disabled: {
    opacity: 0.6,
    backgroundColor: Theme.colors.lightCoffee,
  },

  counter: {
    alignSelf: "flex-end",
    marginTop: Theme.spacing.xs,

    color: Theme.colors.textSecondary,

    fontSize: Theme.typography.fontSize.sm,
  },

  error: {
    marginTop: Theme.spacing.xs,

    color: Theme.colors.danger,

    fontSize: Theme.typography.fontSize.sm,
  },
});

export default TextArea;