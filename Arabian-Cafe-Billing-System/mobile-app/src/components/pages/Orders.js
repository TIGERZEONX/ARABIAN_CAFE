import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../organisms/DashboardLayout";
import billingApi from "../../api/billingApi";

import SearchBar from "../molecules/SearchBar";

import { Card, Text, Badge, Divider } from "../atoms";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await billingApi.getBillingHistory();
        const items = response.data || response || [];
        setOrders(items);
      } catch (error) {
        console.error("Failed to load orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter(
      (item) =>
        (item?.customerName || item?.customer || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item?._id || item?.id || "")
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [orders, search]);

  const getBadgeVariant = (status) => {
    if (!status) return "success"; 
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
          #{ (item?._id || item?.id || "Unknown").toString().slice(-6).toUpperCase() }
        </Text>

        <Badge
          title={item?.status || "Paid"}
          variant={getBadgeVariant(item?.status || "Paid")}
        />
      </View>

      <Divider />

      <View style={styles.row}>
        <Text variant="subtitle">
          Customer
        </Text>

        <Text variant="body">
          {item?.customerName || item?.customer || "Walk-in"}
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="subtitle">
          Table
        </Text>

        <Text variant="body">
          {item?.tableNumber || item?.table || "Takeaway"}
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
          ₹{item?.totalAmount || item?.amount || 0}
        </Text>
      </View>
    </Card>
  );

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Orders History"
      stats={[]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <FlatList
        data={filteredOrders}
        keyExtractor={(item, index) => item?._id ? item._id.toString() : index.toString()}
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
