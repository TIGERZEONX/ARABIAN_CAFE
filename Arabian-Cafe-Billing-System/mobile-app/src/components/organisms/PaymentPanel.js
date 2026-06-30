import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Divider from "../atoms/Divider";

import PaymentMethod from "../molecules/PaymentMethod";

const PaymentPanel = ({
  paymentMethod = "cash",
  onPaymentMethodChange,

  totalAmount = 0,
  amountReceived = "",
  onAmountReceivedChange,

  onCompletePayment,
  onPrintBill,

  loading = false,

  style = {},
}) => {
  const balance = useMemo(() => {
    const received = parseFloat(amountReceived || 0);

    return received - totalAmount;
  }, [amountReceived, totalAmount]);

  const paymentComplete =
    Number(amountReceived || 0) >= totalAmount;

  const formatAmount = (amount) => {
    return Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <Card
      elevation="large"
      style={[styles.container, style]}
    >
      <Text
        variant="heading2"
        style={styles.heading}
      >
        Payment
      </Text>

      <Divider />

      {/* Payment Method */}

      <PaymentMethod
        selectedMethod={paymentMethod}
        onSelect={onPaymentMethodChange}
      />

      <Divider />

      {/* Total Amount */}

      <View style={styles.row}>
        <Text variant="subtitle">
          Total Amount
        </Text>

        <Text
          variant="price"
          color={Theme.colors.success}
        >
          ₹{formatAmount(totalAmount)}
        </Text>
      </View>

      {/* Amount Received */}

      <Input
        label="Amount Received"
        placeholder="Enter amount"
        keyboardType="numeric"
        value={amountReceived}
        onChangeText={onAmountReceivedChange}
      />

      {/* Balance */}

      <View style={styles.row}>
        <Text variant="subtitle">
          Balance
        </Text>

        <Text
          variant="price"
          color={
            balance >= 0
              ? Theme.colors.success
              : Theme.colors.danger
          }
        >
          ₹{formatAmount(Math.abs(balance))}
        </Text>
      </View>

      <Divider />

      {/* Status */}

      <View style={styles.statusContainer}>
        <Text variant="subtitle">
          Status
        </Text>

        <Text
          variant="subtitle"
          color={
            paymentComplete
              ? Theme.colors.success
              : Theme.colors.warning
          }
        >
          {paymentComplete
            ? "Payment Complete"
            : "Waiting for Payment"}
        </Text>
      </View>

      {/* Buttons */}

      <View style={styles.buttonContainer}>
        <Button
          title="Print Bill"
          variant="secondary"
          onPress={onPrintBill}
          style={styles.button}
        />

        <Button
          title="Complete Payment"
          variant="success"
          loading={loading}
          disabled={!paymentComplete}
          onPress={onCompletePayment}
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

  heading: {
    marginBottom: Theme.spacing.md,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: Theme.spacing.md,
  },

  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: Theme.spacing.lg,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: Theme.spacing.lg,
  },

  button: {
    flex: 1,
    marginHorizontal: Theme.spacing.xs,
  },
});

export default PaymentPanel;