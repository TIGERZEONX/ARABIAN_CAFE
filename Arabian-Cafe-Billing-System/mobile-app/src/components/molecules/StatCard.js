import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";

const StatCard = ({
  title,
  value,
  subtitle = "",
  icon = "bar-chart",
  iconColor = Theme.colors.primary,
  backgroundColor = Theme.colors.surface,
  trend = null, // "up" | "down" | null
  trendValue = "",
  onPress,
  style = {},
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return "trending-up";

      case "down":
        return "trending-down";

      default:
        return null;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return Theme.colors.success;

      case "down":
        return Theme.colors.danger;

      default:
        return Theme.colors.textSecondary;
    }
  };

  return (
    <Card
      onPress={onPress}
      elevation="medium"
      style={[
        styles.card,
        {
          backgroundColor,
        },
        style,
      ]}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            size={30}
            color={iconColor}
          />
        </View>

        {trend && (
          <View style={styles.trendContainer}>
            <Icon
              name={getTrendIcon()}
              size={18}
              color={getTrendColor()}
            />

            <Text
              variant="caption"
              color={getTrendColor()}
              style={styles.trendText}
            >
              {trendValue}
            </Text>
          </View>
        )}
      </View>

      <Text
        variant="heading2"
        style={styles.value}
      >
        {value}
      </Text>

      <Text
        variant="subtitle"
        style={styles.title}
      >
        {title}
      </Text>

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
    minHeight: 170,
    justifyContent: "space-between",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconContainer: {
    width: 55,
    height: 55,

    justifyContent: "center",
    alignItems: "center",

    borderRadius: Theme.spacing.radius.circle,

    backgroundColor: Theme.colors.lightCoffee,
  },

  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  trendText: {
    marginLeft: Theme.spacing.xs,
  },

  value: {
    marginTop: Theme.spacing.lg,
  },

  title: {
    marginTop: Theme.spacing.sm,
  },

  subtitle: {
    marginTop: Theme.spacing.sm,
  },
});

export default StatCard;