import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Price = ({
  amount = 0,
  currency = "₹",
  originalPrice = null,
  showOriginalPrice = false,
  discount = null,
  color = Theme.colors.success,
  size = "large",
  align = "left",
  style = {},
  textStyle = {},
}) => {
  const formatPrice = (value) => {
    if (value === null || value === undefined) return "0.00";

    return Number(value).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <View
      style={[
        styles.container,
        { alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start" },
        style,
      ]}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.price,
            styles[size],
            { color },
            textStyle,
          ]}
        >
          {currency}
          {formatPrice(amount)}
        </Text>

        {showOriginalPrice && originalPrice !== null && (
          <Text style={styles.originalPrice}>
            {"  "}
            {currency}
            {formatPrice(originalPrice)}
          </Text>
        )}
      </View>

      {discount !== null && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>
            {discount}% OFF
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  price: {
    fontWeight: Theme.typography.fontWeight.bold,
  },

  small: {
    fontSize: Theme.typography.fontSize.md,
  },

  medium: {
    fontSize: Theme.typography.fontSize.lg,
  },

  large: {
    fontSize: Theme.typography.fontSize.xl,
  },

  extraLarge: {
    fontSize: Theme.typography.fontSize.display,
  },

  originalPrice: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.textSecondary,
    textDecorationLine: "line-through",
  },

  discountBadge: {
    alignSelf: "flex-start",

    marginTop: Theme.spacing.xs,

    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 3,

    backgroundColor: Theme.colors.danger,

    borderRadius: Theme.spacing.radius.circle,
  },

  discountText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.sm,
    fontWeight: Theme.typography.fontWeight.bold,
  },
});

export default Price;