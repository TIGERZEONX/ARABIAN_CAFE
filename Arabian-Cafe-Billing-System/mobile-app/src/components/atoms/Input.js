import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Theme from "../../styles/theme";

const Input = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  editable = true,
  multiline = false,
  numberOfLines = 1,
  error = "",
  leftIcon = null,
  rightIcon = null,
  onRightIconPress,
  style = {},
  inputStyle = {},
  maxLength,
  returnKeyType = "done",
  onSubmitEditing,
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          focused && styles.focused,
          error && styles.errorBorder,
          !editable && styles.disabled,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            multiline && styles.multiline,
            inputStyle,
          ]}
        />

        {rightIcon && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRightIconPress}
            style={styles.rightIcon}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
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
    fontSize: Theme.typography.fontSize.md,
    fontWeight: Theme.typography.fontWeight.semiBold,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.sm,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Theme.colors.surface,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    borderRadius: Theme.spacing.radius.md,

    paddingHorizontal: Theme.spacing.lg,

    minHeight: 52,
  },

  focused: {
    borderColor: Theme.colors.primary,
    borderWidth: 2,
  },

  disabled: {
    opacity: 0.6,
  },

  errorBorder: {
    borderColor: Theme.colors.danger,
  },

  input: {
    flex: 1,

    fontSize: Theme.typography.fontSize.base,

    color: Theme.colors.textPrimary,

    paddingVertical: Theme.spacing.md,
  },

  multiline: {
    textAlignVertical: "top",
    minHeight: 100,
  },

  leftIcon: {
    marginRight: Theme.spacing.md,
  },

  rightIcon: {
    marginLeft: Theme.spacing.md,
  },

  error: {
    marginTop: Theme.spacing.xs,

    color: Theme.colors.danger,

    fontSize: Theme.typography.fontSize.sm,
  },
});

export default Input;