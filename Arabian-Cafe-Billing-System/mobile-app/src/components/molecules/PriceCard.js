import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Price from "../atoms/Price";
import Badge from "../atoms/Badge";
import Icon from "../atoms/Icon";

const PriceCard = ({
  title,
  amount = 0,
  subtitle = "",
  icon = "payments",
  badge = "",
  badgeVariant = "success",
  currency = "₹",
  elevation = "medium",
  style = {},
}) => {
  return (
    <Card
      elevation={elevation}
      style={[styles.card, style]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            size={28}
            color={Theme.colors.primary}
          />
        </View>

        {badge ? (
          <Badge
            title={badge}
            variant={badgeVariant}
            size="small"
          />
        ) : null}
      </View>

      <Text
        variant="heading3"
        style={styles.title}
      >
        {title}
      </Text>

      <Price
        amount={amount}
        currency={currency}
        size="large"
      />

      {subtitle ? (
        <Text
          variant="caption"
          color={Theme.colors.textSecondary}
          style={styles.subtitle}
        >
          {subtitle}
        </Text>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 150,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },

  iconContainer: {
    width: 52,
    height: 52,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: Theme.spacing.radius.circle,

    backgroundColor: Theme.colors.lightCoffee,
  },

  title: {
    marginBottom: Theme.spacing.sm,
  },

  subtitle: {
    marginTop: Theme.spacing.md,
  },
});

export default PriceCard;