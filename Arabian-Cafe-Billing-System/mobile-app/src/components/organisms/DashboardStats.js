import React from "react";
import { View, StyleSheet } from "react-native";

import Theme from "../../styles/theme";
import StatCard from "../molecules/StatCard";

const DashboardStats = ({
  stats = [],
  columns = 2,
  style = {},
}) => {
  const cardWidth = columns === 1 ? "100%" : "48%";

  return (
    <View style={[styles.container, style]}>
      <View style={styles.grid}>
        {stats.map((item, index) => (
          <View
            key={item.id || index}
            style={[
              styles.cardWrapper,
              {
                width: cardWidth,
              },
            ]}
          >
            <StatCard
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              iconColor={item.iconColor}
              backgroundColor={item.backgroundColor}
              trend={item.trend}
              trendValue={item.trendValue}
              onPress={item.onPress}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardWrapper: {
    marginBottom: Theme.spacing.lg,
  },
});

export default DashboardStats;