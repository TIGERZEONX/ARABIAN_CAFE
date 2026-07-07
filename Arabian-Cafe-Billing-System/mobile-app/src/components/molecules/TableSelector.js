import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";

const TableSelector = ({
  tables = [],
  selectedTable = null,
  onSelect,
  style = {},
}) => {
  const getBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "success";

      case "occupied":
        return "danger";

      case "reserved":
        return "warning";

      default:
        return "secondary";
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Text
        variant="heading3"
        style={styles.heading}
      >
        Select Table
      </Text>

      <View style={styles.grid}>
        {tables.map((table) => {
          const isSelected =
            selectedTable === table.id;

          return (
            <TouchableOpacity
              key={table.id}
              activeOpacity={0.8}
              disabled={table.status === "occupied"}
              onPress={() => onSelect?.(table)}
              style={styles.touchable}
            >
              <Card
                elevation={isSelected ? "large" : "small"}
                style={[
                  styles.card,
                  isSelected && styles.selectedCard,
                  table.status === "occupied" &&
                    styles.disabledCard,
                ]}
              >
                <Text
                  variant="heading2"
                  align="center"
                >
                  {table.number}
                </Text>

                <Text
                  variant="caption"
                  align="center"
                  style={styles.tableText}
                >
                  Table
                </Text>

                <Badge
                  title={table.status}
                  variant={getBadgeVariant(table.status)}
                  size="small"
                  style={styles.badge}
                />
              </Card>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  heading: {
    marginBottom: Theme.spacing.lg,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  touchable: {
    width: "31%",
    marginBottom: Theme.spacing.lg,
  },

  card: {
    alignItems: "center",
    justifyContent: "center",

    minHeight: 130,

    borderWidth: 2,
    borderColor: Theme.colors.border,
  },

  selectedCard: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.lightCoffee,
  },

  disabledCard: {
    opacity: 0.5,
  },

  tableText: {
    marginTop: Theme.spacing.xs,
  },

  badge: {
    marginTop: Theme.spacing.md,
  },
});

export default TableSelector;