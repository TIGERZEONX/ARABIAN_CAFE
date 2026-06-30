import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Divider from "../atoms/Divider";
import BillItemRow from "../molecules/BillItemRow";

const BillingTable = ({
  items = [],

  onIncrease,
  onDecrease,
  onDelete,

  style = {},
}) => {
  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const renderItem = ({ item }) => (
    <BillItemRow
      itemName={item.name}
      quantity={item.quantity}
      price={item.price}
      total={item.quantity * item.price}
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
        <Text variant="heading3">
          Billing Items
        </Text>

        <Text
          variant="subtitle"
          color={Theme.colors.primary}
        >
          {items.length} Products
        </Text>
      </View>

      <Divider />

      {/* Column Header */}

      <View style={styles.tableHeader}>
        <Text
          variant="subtitle"
          style={styles.itemColumn}
        >
          Item
        </Text>

        <Text
          variant="subtitle"
          style={styles.qtyColumn}
          align="center"
        >
          Qty
        </Text>

        <Text
          variant="subtitle"
          style={styles.totalColumn}
          align="right"
        >
          Total
        </Text>
      </View>

      <Divider />

      {/* Empty State */}

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            variant="heading3"
            color={Theme.colors.textSecondary}
            align="center"
          >
            No Items Added
          </Text>

          <Text
            variant="caption"
            color={Theme.colors.textSecondary}
            align="center"
            style={styles.emptyText}
          >
            Add menu items to create a bill.
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}

      <Divider />

      {/* Footer */}

      <View style={styles.footer}>
        <View>
          <Text variant="subtitle">
            Total Quantity
          </Text>

          <Text
            variant="heading3"
            color={Theme.colors.primary}
          >
            {totalQuantity}
          </Text>
        </View>

        <View style={styles.amountContainer}>
          <Text variant="subtitle">
            Total Amount
          </Text>

          <Text
            variant="price"
            color={Theme.colors.success}
          >
            ₹{totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
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

    marginBottom: Theme.spacing.md,
  },

  tableHeader: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: Theme.spacing.sm,
  },

  itemColumn: {
    flex: 2,
  },

  qtyColumn: {
    width: 90,
  },

  totalColumn: {
    width: 110,
  },

  list: {
    paddingVertical: Theme.spacing.sm,
  },

  emptyContainer: {
    paddingVertical: Theme.spacing.xxxl,
    alignItems: "center",
  },

  emptyText: {
    marginTop: Theme.spacing.sm,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingTop: Theme.spacing.lg,
  },

  amountContainer: {
    alignItems: "flex-end",
  },
});

export default BillingTable;