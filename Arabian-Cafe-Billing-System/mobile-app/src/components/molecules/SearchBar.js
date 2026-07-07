import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";
import Icon from "../atoms/Icon";

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  onSearch,
  onClear,
  editable = true,
  autoFocus = false,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon
        name="search"
        size={22}
        color={Theme.colors.textSecondary}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.textSecondary}
        editable={editable}
        autoFocus={autoFocus}
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />

      {value ? (
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.7}
        >
          <Icon
            name="close"
            size={20}
            color={Theme.colors.textSecondary}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    height: 52,

    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.spacing.radius.lg,

    borderWidth: 1,
    borderColor: Theme.colors.border,

    paddingHorizontal: Theme.spacing.lg,

    ...Theme.shadows.small,
  },

  input: {
    flex: 1,

    marginHorizontal: Theme.spacing.md,

    fontSize: Theme.typography.fontSize.base,

    color: Theme.colors.textPrimary,
  },
});

export default SearchBar;