import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../templates/DashboardLayout";

import PriceCard from "../molecules/PriceCard";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";

const Reports = () => {
  const dashboardStats = [
    {
      id: 1,
      title: "Today's Sales",
      value: "₹12,450",
      subtitle: "Today's Revenue",
      icon: "payments",
      trend: "up",
      trendValue: "+8%",
    },
    {
      id: 2,
      title: "Orders",
      value: "128",
      subtitle: "Completed Orders",
      icon: "shopping-bag",
      trend: "up",
      trendValue: "+12%",
    },
  ];

  const paymentMethods = [
    {
      method: "Cash",
      amount: 6540,
    },
    {
      method: "UPI",
      amount: 4380,
    },
    {
      method: "Card",
      amount: 1260,
    },
    {
      method: "Wallet",
      amount: 270,
    },
  ];

  const topSelling = [
    "Chicken Shawarma",
    "Zinger Burger",
    "Arabic Tea",
    "French Fries",
    "Chicken Roll",
  ];

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Reports"
      stats={dashboardStats}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Revenue */}

        <PriceCard
          title="Today's Revenue"
          amount={12450}
          subtitle="Total Sales"
          icon="payments"
          badge="LIVE"
          badgeVariant="success"
        />

        <View style={styles.space} />

        <PriceCard
          title="Weekly Revenue"
          amount={82450}
          subtitle="Last 7 Days"
          icon="calendar-month"
          badge="Weekly"
          badgeVariant="primary"
        />

        <View style={styles.space} />

        <PriceCard
          title="Monthly Revenue"
          amount={325840}
          subtitle="Current Month"
          icon="account-balance-wallet"
          badge="Monthly"
          badgeVariant="warning"
        />

        <View style={styles.space} />

        {/* Top Selling */}

        <Card elevation="medium">
          <Text variant="heading3">
            Top Selling Items
          </Text>

          <Divider />

          {topSelling.map((item, index) => (
            <View
              key={index}
              style={styles.row}
            >
              <Text variant="body">
                {index + 1}. {item}
              </Text>
            </View>
          ))}
        </Card>

        <View style={styles.space} />

        {/* Payment Report */}

        <Card elevation="medium">
          <Text variant="heading3">
            Payment Breakdown
          </Text>

          <Divider />

          {paymentMethods.map((item, index) => (
            <View
              key={index}
              style={styles.row}
            >
              <Text variant="body">
                {item.method}
              </Text>

              <Text
                variant="subtitle"
                color={Theme.colors.success}
              >
                ₹
                {item.amount.toLocaleString(
                  "en-IN"
                )}
              </Text>
            </View>
          ))}
        </Card>

        <View style={styles.space} />

        {/* Actions */}

        <Button
          title="Export Report"
          onPress={() => {}}
          style={styles.button}
        />

        <Button
          title="Print Report"
          variant="secondary"
          onPress={() => {}}
          style={styles.button}
        />
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  space: {
    height: Theme.spacing.lg,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginVertical: Theme.spacing.sm,
  },

  button: {
    marginTop: Theme.spacing.lg,
  },
});

export default Reports;