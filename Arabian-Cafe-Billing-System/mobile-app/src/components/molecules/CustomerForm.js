import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Input from "../atoms/Input";
import Select from "../atoms/Select";
import TextArea from "../atoms/TextArea";

const CustomerForm = ({
  customerName = "",
  onCustomerNameChange,

  phone = "",
  onPhoneChange,

  tableNumber = "",
  onTableChange,

  remarks = "",
  onRemarksChange,

  tableOptions = [],

  errors = {},

  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Input
        label="Customer Name"
        placeholder="Enter customer name"
        value={customerName}
        onChangeText={onCustomerNameChange}
        error={errors.customerName}
      />

      <Input
        label="Phone Number"
        placeholder="Enter phone number"
        value={phone}
        onChangeText={onPhoneChange}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors.phone}
      />

      <Select
        label="Table Number"
        selectedValue={tableNumber}
        onValueChange={onTableChange}
        items={tableOptions}
        placeholder="Select Table"
        error={errors.tableNumber}
      />

      <TextArea
        label="Remarks"
        placeholder="Special instructions..."
        value={remarks}
        onChangeText={onRemarksChange}
        numberOfLines={4}
        maxLength={200}
        error={errors.remarks}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Theme.colors.surface,
    borderRadius: Theme.spacing.radius.xxl,
    padding: Theme.spacing.xl,

    ...Theme.shadows.medium,
  },
});

export default CustomerForm;