import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../templates/DashboardLayout";

import SearchBar from "../molecules/SearchBar";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import Divider from "../atoms/Divider";

const Orders = () => {
  const [search, setSearch] = useState("");

  const [orders] = useState([
    {
      id: "ORD001",
      customer: "Hari",
      table: "Table 1",
      amount: 540,
      status: "Paid",
    },
    {
      id: "ORD002",
      customer: "Rahul",
      table: "Table 2",
      amount: 240,
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Ajay",
      table: "Take Away",
      amount: 890,
      status: "Paid",
    },
    {
      id: "ORD004",
      customer: "Suresh",
      table: "Table 5",
      amount: 150,
      status: "Cancelled",
    },
  ]);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (item) =>
        item.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.id
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const getBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
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

  const renderItem = ({ item }) => (
    <Card
      style={styles.card}
      elevation="medium"
    >
      <View style={styles.header}>
        <Text variant="heading3">
          {item.id}
        </Text>

        <Badge
          title={item.status}
          variant={getBadgeVariant(item.status)}
        />
      </View>

      <Divider />

      <View style={styles.row}>
        <Text variant="subtitle">
          Customer
        </Text>

        <Text variant="body">
          {item.customer}
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="subtitle">
          Table
        </Text>

        <Text variant="body">
          {item.table}
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="subtitle">
          Amount
        </Text>

        <Text
          variant="price"
          color={Theme.colors.success}
        >
          ₹{item.amount}
        </Text>
      </View>
    </Card>
  );

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Orders"
      stats={[]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxxl,
  },

  card: {
    marginBottom: Theme.spacing.lg,
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
});

export default Orders;