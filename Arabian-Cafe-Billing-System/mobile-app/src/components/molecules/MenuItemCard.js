import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Button from "../atoms/Button";
import Badge from "../atoms/Badge";
import Price from "../atoms/Price";

const MenuItemCard = ({
  image,
  name,
  category,
  price,
  available = true,
  onAdd,
  style = {},
}) => {
  return (
    <Card
      style={[styles.card, style]}
      elevation="medium"
    >
      <Image
        source={
          image
            ? image
            : {
                uri: "https://via.placeholder.com/300x200.png?text=Food",
              }
        }
        resizeMode="cover"
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="heading3"
            numberOfLines={1}
          >
            {name}
          </Text>

          <Badge
            title={available ? "Available" : "Out of Stock"}
            variant={available ? "success" : "danger"}
            size="small"
          />
        </View>

        <Text
          variant="caption"
          color={Theme.colors.textSecondary}
          style={styles.category}
        >
          {category}
        </Text>

        <View style={styles.footer}>
          <Price
            amount={price}
            size="medium"
          />

          <Button
            title="Add"
            size="small"
            onPress={onAdd}
            disabled={!available}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: 170,
  },

  content: {
    padding: Theme.spacing.lg,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  category: {
    marginTop: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default MenuItemCard;