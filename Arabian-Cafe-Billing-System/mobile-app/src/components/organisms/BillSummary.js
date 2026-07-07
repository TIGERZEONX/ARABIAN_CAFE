import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";

const BillSummary = ({
  orderId = "#0001",
  tableNumber = "Table 1",
  customerName = "Walk-in Customer",

  totalItems = 0,
  subtotal = 0,
  tax = 0,
  discount = 0,
  grandTotal = 0,

  paymentMethod = "Cash",
  paymentStatus = "Pending",

  onGenerateBill,
  onPrintBill,

  style = {},
}) => {
  const getStatusVariant = () => {
    switch (paymentStatus.toLowerCase()) {
      case "paid":
        return "success";

      case "pending":
        return "warning";

      case "cancelled":
        return "danger";

      default:
        return "secondary";
    }
  };

  const SummaryRow = ({ label, value, highlight = false }) => (
    <View style={styles.row}>
      <Text
        variant={highlight ? "heading3" : "body"}
      >
        {label}
      </Text>

      <Text
        variant={highlight ? "price" : "body"}
        color={
          highlight
            ? Theme.colors.success
            : Theme.colors.textPrimary
        }
      >
        {value}
      </Text>
    </View>
  );

  return (
    <Card
      elevation="large"
      style={[styles.container, style]}
    >
      {/* Header */}

      <View style={styles.header}>
        <View>
          <Text variant="heading3">
            Bill Summary
          </Text>

          <Text
            variant="caption"
            color={Theme.colors.textSecondary}
          >
            Order {orderId}
          </Text>
        </View>

        <Badge
          title={paymentStatus}
          variant={getStatusVariant()}
        />
      </View>

      <Divider />

      {/* Customer Details */}

      <SummaryRow
        label="Customer"
        value={customerName}
      />

      <SummaryRow
        label="Table"
        value={tableNumber}
      />

      <SummaryRow
        label="Payment"
        value={paymentMethod}
      />

      <Divider />

      {/* Bill Details */}

      <SummaryRow
        label="Items"
        value={totalItems}
      />

      <SummaryRow
        label="Subtotal"
        value={`₹${subtotal.toFixed(2)}`}
      />

      <SummaryRow
        label="Tax"
        value={`₹${tax.toFixed(2)}`}
      />

      <SummaryRow
        label="Discount"
        value={`₹${discount.toFixed(2)}`}
      />

      <Divider />

      <SummaryRow
        label="Grand Total"
        value={`₹${grandTotal.toFixed(2)}`}
        highlight
      />

      {/* Buttons */}

      <View style={styles.buttonContainer}>
        <Button
          title="Print Bill"
          variant="secondary"
          onPress={onPrintBill}
          style={styles.button}
        />

        <Button
          title="Generate Bill"
          onPress={onGenerateBill}
          style={styles.button}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: Theme.spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: Theme.spacing.sm,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: Theme.spacing.xl,
  },

  button: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
});

export default BillSummary;