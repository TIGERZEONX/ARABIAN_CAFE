import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Icon from "../atoms/Icon";

const PAYMENT_METHODS = [
  {
    id: "cash",
    title: "Cash",
    icon: "payments",
  },
  {
    id: "upi",
    title: "UPI",
    icon: "qr-code",
  },
  {
    id: "card",
    title: "Card",
    icon: "credit-card",
  },
  {
    id: "wallet",
    title: "Wallet",
    icon: "account-balance-wallet",
  },
];

const PaymentMethod = ({
  selectedMethod = "",
  onSelect,
  methods = PAYMENT_METHODS,
  style = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text
        variant="heading3"
        style={styles.heading}
      >
        Payment Method
      </Text>

      <View style={styles.grid}>
        {methods.map((item) => {
          const selected = selectedMethod === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => onSelect?.(item.id)}
              style={styles.touchable}
            >
              <Card
                elevation={selected ? "large" : "small"}
                style={[
                  styles.card,
                  selected && styles.selectedCard,
                ]}
              >
                <View
                  style={[
                    styles.iconContainer,
                    selected && styles.selectedIconContainer,
                  ]}
                >
                  <Icon
                    name={item.icon}
                    size={32}
                    color={
                      selected
                        ? Theme.colors.white
                        : Theme.colors.primary
                    }
                  />
                </View>

                <Text
                  variant="subtitle"
                  align="center"
                  style={styles.title}
                >
                  {item.title}
                </Text>
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
    width: "48%",
    marginBottom: Theme.spacing.lg,
  },

  card: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: 140,
    borderWidth: 2,
    borderColor: Theme.colors.border,
  },

  selectedCard: {
    borderColor: Theme.colors.primary,
    backgroundColor: Theme.colors.lightCoffee,
  },

  iconContainer: {
    width: 64,
    height: 64,

    borderRadius: Theme.spacing.radius.circle,

    backgroundColor: Theme.colors.background,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: Theme.spacing.md,
  },

  selectedIconContainer: {
    backgroundColor: Theme.colors.primary,
  },

  title: {
    marginTop: Theme.spacing.sm,
  },
});

export default PaymentMethod;