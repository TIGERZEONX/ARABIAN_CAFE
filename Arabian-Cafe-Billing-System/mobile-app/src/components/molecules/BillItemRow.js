import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import Theme from "../../styles/theme";

import Text from "../atoms/Text";
import Price from "../atoms/Price";
import Icon from "../atoms/Icon";

const BillItemRow = ({
  itemName,
  quantity = 1,
  price = 0,
  total,
  onIncrease,
  onDecrease,
  onDelete,
  style = {},
}) => {
  const itemTotal = total ?? quantity * price;

  return (
    <View style={[styles.container, style]}>
      {/* Item Details */}
      <View style={styles.leftSection}>
        <Text
          variant="subtitle"
          numberOfLines={1}
        >
          {itemName}
        </Text>

        <Price
          amount={price}
          size="small"
          color={Theme.colors.textSecondary}
        />
      </View>

      {/* Quantity Controls */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onDecrease}
          activeOpacity={0.8}
        >
          <Icon
            name="remove"
            size={18}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>

        <Text
          variant="body"
          style={styles.quantity}
        >
          {quantity}
        </Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={onIncrease}
          activeOpacity={0.8}
        >
          <Icon
            name="add"
            size={18}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Total Price */}
      <View style={styles.totalSection}>
        <Price
          amount={itemTotal}
          size="medium"
        />
      </View>

      {/* Delete Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={onDelete}
        activeOpacity={0.8}
      >
        <Icon
          name="delete"
          size={22}
          color={Theme.colors.danger}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Theme.colors.surface,

    padding: Theme.spacing.lg,

    marginBottom: Theme.spacing.md,

    borderRadius: Theme.spacing.radius.lg,

    ...Theme.shadows.small,
  },

  leftSection: {
    flex: 2,
    marginRight: Theme.spacing.md,
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  iconButton: {
    width: 34,
    height: 34,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: Theme.spacing.radius.circle,

    backgroundColor: Theme.colors.lightCoffee,
  },

  quantity: {
    marginHorizontal: Theme.spacing.md,
    minWidth: 24,
    textAlign: "center",
  },

  totalSection: {
    minWidth: 90,
    alignItems: "flex-end",
    marginLeft: Theme.spacing.lg,
  },

  deleteButton: {
    marginLeft: Theme.spacing.lg,
    padding: Theme.spacing.sm,
  },
});

export default BillItemRow;
