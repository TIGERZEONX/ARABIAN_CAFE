import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";
import MenuItemCard from "../molecules/MenuItemCard";

const ProductGrid = ({
  products = [],
  numColumns = 2,
  onAddToCart,
  contentContainerStyle = {},
  style = {},
}) => {
  const renderItem = ({ item }) => (
    <View
      style={[
        styles.itemContainer,
        {
          width: numColumns === 1 ? "100%" : "48%",
        },
      ]}
    >
      <MenuItemCard
        image={item.image}
        name={item.name}
        category={item.category}
        price={item.price}
        available={item.available}
        onAdd={() => onAddToCart?.(item)}
      />
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={products}
        keyExtractor={(item, index) =>
          item.id?.toString() || index.toString()
        }
        renderItem={renderItem}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          contentContainerStyle,
        ]}
        columnWrapperStyle={
          numColumns > 1
            ? styles.columnWrapper
            : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    paddingBottom: Theme.spacing.xl,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: Theme.spacing.lg,
  },

  itemContainer: {
    marginBottom: Theme.spacing.lg,
  },
});

export default ProductGrid;