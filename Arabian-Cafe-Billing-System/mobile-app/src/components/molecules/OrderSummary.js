import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Price from "../atoms/Price";
import Button from "../atoms/Button";
import Divider from "../atoms/Divider";
import Badge from "../atoms/Badge";

const OrderSummary = ({
  subtotal = 0,
  tax = 0,
  discount = 0,
  total = 0,

  paymentStatus = "Pending", // Pending | Paid | Cancelled

  buttonTitle = "Generate Bill",
  onButtonPress,

  style = {},
}) => {
  const getBadgeVariant = () => {
    switch (paymentStatus.toLowerCase()) {
      case "paid":
        return "success";

      case "cancelled":
        return "danger";

      case "pending":
      default:
        return "warning";
    }
  };

  const Row = ({ label, value, isTotal = false }) => (
    <View style={styles.row}>
      <Text
        variant={isTotal ? "heading3" : "body"}
      >
        {label}
      </Text>

      <Price
        amount={value}
        size={isTotal ? "large" : "medium"}
        color={
          isTotal
            ? Theme.colors.success
            : Theme.colors.textPrimary
        }
      />
    </View>
  );

  return (
    <Card
      elevation="medium"
      style={[styles.container, style]}
    >
      <View style={styles.header}>
        <Text variant="heading3">
          Order Summary
        </Text>

        <Badge
          title={paymentStatus}
          variant={getBadgeVariant()}
          size="small"
        />
      </View>

      <Divider />

      <Row
        label="Subtotal"
        value={subtotal}
      />

      <Row
        label="Tax"
        value={tax}
      />

      <Row
        label="Discount"
        value={discount}
      />

      <Divider />

      <Row
        label="Grand Total"
        value={total}
        isTotal
      />

      <Button
        title={buttonTitle}
        onPress={onButtonPress}
        style={styles.button}
      />
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

  button: {
    marginTop: Theme.spacing.xl,
  },
});

export default OrderSummary;