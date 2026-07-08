import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../organisms/DashboardLayout";
import inventoryApi from "../../api/inventoryApi";


import SearchBar from "../molecules/SearchBar";

import { Card, Text, Badge, Divider, Button } from "../atoms";


const Inventory = () => {
  const [search, setSearch] = useState("");
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        // Fetch data from your backend
        const response = await inventoryApi.getInventory();
        
        // Backend usually returns an array directly, or inside a 'data' property
        const items = response.data || response || [];
        
        // Update your state with the real items!
        setInventory(items);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      }
    };

    loadInventory();
  }, []);


  const filteredInventory = useMemo(() => {
    return inventory.filter(
      (item) =>
        (item?.name || "")
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        (item?.category || "")
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
            {item?.name || "Unknown Item"}
          </Text>

          <Text
            variant="caption"
            color={Theme.colors.textSecondary}
          >
            {item?.category || "No Category"}
          </Text>
        </View>

        <Badge
          title={item?.status || "Unknown"}
          variant={getBadgeVariant(item?.status)}
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
          {item?.stock || 0} {item?.unit || "Unit"}
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
        keyExtractor={(item, index) =>
          item?._id ? item._id.toString() : (item?.id ? item.id.toString() : index.toString())
        }
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
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
