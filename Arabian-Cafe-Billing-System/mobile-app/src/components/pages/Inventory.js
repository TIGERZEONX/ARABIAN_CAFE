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
import Button from "../atoms/Button";

const Inventory = () => {
  const [search, setSearch] = useState("");

  const [inventory] = useState([
    {
      id: 1,
      name: "Chicken",
      category: "Meat",
      stock: 45,
      unit: "Kg",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Arabic Bread",
      category: "Bakery",
      stock: 12,
      unit: "Pack",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Mayonnaise",
      category: "Sauce",
      stock: 8,
      unit: "Bottle",
      status: "Low Stock",
    },
    {
      id: 4,
      name: "French Fries",
      category: "Frozen",
      stock: 28,
      unit: "Pack",
      status: "In Stock",
    },
    {
      id: 5,
      name: "Soft Drinks",
      category: "Beverage",
      stock: 0,
      unit: "Bottle",
      status: "Out of Stock",
    },
  ]);

  const filteredInventory = useMemo(() => {
    return inventory.filter(
      (item) =>
        item.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search, inventory]);

  const getBadgeVariant = (status) => {
    switch (status) {
      case "In Stock":
        return "success";

      case "Low Stock":
        return "warning";

      case "Out of Stock":
        return "danger";

      default:
        return "secondary";
    }
  };

  const renderItem = ({ item }) => (
    <Card
      elevation="medium"
      style={styles.card}
    >
      <View style={styles.header}>
        <View>
          <Text variant="heading3">
            {item.name}
          </Text>

          <Text
            variant="caption"
            color={Theme.colors.textSecondary}
          >
            {item.category}
          </Text>
        </View>

        <Badge
          title={item.status}
          variant={getBadgeVariant(item.status)}
        />
      </View>

      <Divider />

      <View style={styles.row}>
        <Text variant="subtitle">
          Available Stock
        </Text>

        <Text
          variant="heading3"
          color={Theme.colors.primary}
        >
          {item.stock} {item.unit}
        </Text>
      </View>

      <Button
        title="Update Stock"
        size="small"
        onPress={() => {}}
        style={styles.button}
      />
    </Card>
  );

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Inventory"
      stats={[]}
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        onClear={() => setSearch("")}
      />

      <FlatList
        data={filteredInventory}
        renderItem={renderItem}
        keyExtractor={(item) =>
          item.id.toString()
        }
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

    marginBottom: Theme.spacing.md,
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

export default Inventory;