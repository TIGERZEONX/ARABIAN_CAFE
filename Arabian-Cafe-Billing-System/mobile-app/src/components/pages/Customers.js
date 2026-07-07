import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../organisms/DashboardLayout";
import customerApi from "../../api/customerApi";

import SearchBar from "../molecules/SearchBar";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";
import Divider from "../atoms/Divider";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

const Customers = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerApi.getCustomers();
        const items = response.data || response || [];
        setCustomers(items);
      } catch (error) {
        console.error("Failed to load customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (item) =>
        (item?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item?.phone || "").includes(search)
    );
  }, [customers, search]);

  const getBadgeVariant = (loyalty) => {
    if (!loyalty) return "primary";
    switch (loyalty.toLowerCase()) {
      case "gold":
        return "warning";
      case "silver":
        return "secondary";
      case "bronze":
        return "danger";
      default:
        return "primary";
    }
  };

  const renderItem = ({ item }) => (
    <Card
      elevation="medium"
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.profile}>
          <Avatar
            name={item?.name || "Customer"}
            size="medium"
          />

          <View style={styles.profileInfo}>
            <Text variant="heading3">
              {item?.name || "Unknown"}
            </Text>

            <Text
              variant="caption"
              color={Theme.colors.textSecondary}
            >
              {item?.phone || "No Phone"}
            </Text>
          </View>
        </View>

        <Badge
          title={item?.loyalty || "New"}
          variant={getBadgeVariant(item?.loyalty || "New")}
        />
      </View>

      <Divider />

      <View style={styles.row}>
        <Text variant="subtitle">
          Total Orders
        </Text>

        <Text
          variant="heading3"
          color={Theme.colors.primary}
        >
          {item?.totalOrders || item?.orders || 0}
        </Text>
      </View>

      <View style={styles.row}>
        <Text variant="subtitle">
          Total Spent
        </Text>

        <Text
          variant="price"
          color={Theme.colors.success}
        >
          ₹{(item?.totalSpent || item?.spent || 0).toLocaleString("en-IN")}
        </Text>
      </View>

      <Button
        title="View Profile"
        size="small"
        onPress={() => {}}
        style={styles.button}
      />
    </Card>
  );

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Customers Directory"
      stats={[]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item, index) =>
          item?._id ? item._id.toString() : (item?.id ? item.id.toString() : index.toString())
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
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
  },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  profileInfo: {
    marginLeft: Theme.spacing.md,
    flex: 1,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Theme.spacing.md,
  },

  button: {
    marginTop: Theme.spacing.lg,
  },
});

export default Customers;
