import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";
import BillItemRow from "../molecules/BillItemRow";

const Cart = ({
  items = [],
  onIncrease,
  onDecrease,
  onDelete,
  style = {},
}) => {
  const totalItems = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <BillItemRow
      itemName={item.name}
      quantity={item.quantity}
      price={item.price}
      total={item.price * item.quantity}
      onIncrease={() => onIncrease?.(item)}
      onDecrease={() => onDecrease?.(item)}
      onDelete={() => onDelete?.(item)}
    />
  );

  return (
    <Card
      elevation="medium"
      style={[styles.container, style]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Icon
            name="shopping-cart"
            size={26}
            color={Theme.colors.primary}
          />

          <Text
            variant="heading3"
            style={styles.title}
          >
            Cart
          </Text>
        </View>

        <Text
          variant="subtitle"
          color={Theme.colors.primary}
        >
          {totalItems} Items
        </Text>
      </View>

      {/* Empty Cart */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon
            name="remove-shopping-cart"
            size={70}
            color={Theme.colors.textSecondary}
          />

          <Text
            variant="heading3"
            color={Theme.colors.textSecondary}
            align="center"
            style={styles.emptyTitle}
          >
            Cart is Empty
          </Text>

          <Text
            variant="caption"
            color={Theme.colors.textSecondary}
            align="center"
          >
            Add menu items to start billing.
          </Text>
        </View>
      ) : (
        <>
          {/* Cart Items */}
          <FlatList
            data={items}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />

          {/* Footer */}
          <View style={styles.footer}>
            <Text variant="heading3">
              Total
            </Text>

            <Text
              variant="price"
              color={Theme.colors.success}
            >
              ₹{totalAmount.toFixed(2)}
            </Text>
          </View>
        </>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: Theme.spacing.lg,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    marginLeft: Theme.spacing.sm,
  },

  list: {
    paddingBottom: Theme.spacing.md,
  },

  emptyContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: Theme.spacing.xxxl,
  },

  emptyTitle: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.sm,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,

    borderTopWidth: 1,
    borderColor: Theme.colors.border,
  },
});

export default Cart;