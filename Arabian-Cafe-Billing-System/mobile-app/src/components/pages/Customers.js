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
import Avatar from "../atoms/Avatar";
import Button from "../atoms/Button";

const Customers = () => {
  const [search, setSearch] = useState("");

  const [customers] = useState([
    {
      id: 1,
      name: "Hari Haran",
      phone: "9876543210",
      orders: 45,
      spent: 12450,
      loyalty: "Gold",
    },
    {
      id: 2,
      name: "Rahul Kumar",
      phone: "9123456789",
      orders: 18,
      spent: 4580,
      loyalty: "Silver",
    },
    {
      id: 3,
      name: "Ajay",
      phone: "9988776655",
      orders: 8,
      spent: 1890,
      loyalty: "Bronze",
    },
    {
      id: 4,
      name: "Mohammed Ali",
      phone: "9001122334",
      orders: 63,
      spent: 21840,
      loyalty: "Gold",
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.phone.includes(search)
    );
  }, [customers, search]);

  const getBadgeVariant = (loyalty) => {
    switch (loyalty) {
      case "Gold":
        return "warning";

      case "Silver":
        return "secondary";

      case "Bronze":
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
            name={item.name}
            size="medium"
          />

          <View style={styles.profileInfo}>
            <Text variant="heading3">
              {item.name}
            </Text>

            <Text
              variant="caption"
              color={Theme.colors.textSecondary}
            >
              {item.phone}
            </Text>
          </View>
        </View>

        <Badge
          title={item.loyalty}
          variant={getBadgeVariant(item.loyalty)}
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
          {item.orders}
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
          ₹{item.spent.toLocaleString("en-IN")}
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
      subtitle="Customers"
      stats={[]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) =>
          item.id.toString()
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