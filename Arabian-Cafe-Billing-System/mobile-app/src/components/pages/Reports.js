import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";

import Theme from "../../styles/theme";
import DashboardLayout from "../organisms/DashboardLayout";
import PriceCard from "../molecules/PriceCard";
import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Divider from "../atoms/Divider";
import Button from "../atoms/Button";
import dashboardApi from "../../api/dashboardApi"; 

const Reports = () => {
  const [stats, setStats] = useState({
    revenue: 0,
    orderCount: 0,
    averageBillValue: 0,
    totalTax: 0,
    pendingOrdersCount: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardApi.getStats();
        // Backend returns { success: true, data: { revenue, orderCount... } }
        const data = response.data || response || {};
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  const dashboardStats = [
    {
      id: 1,
      title: "Today's Sales",
      value: `₹${(stats.revenue || 0).toLocaleString("en-IN")}`,
      subtitle: "Today's Revenue",
      icon: "payments",
      trend: "up",
      trendValue: "Live",
    },
    {
      id: 2,
      title: "Orders",
      value: `${stats.orderCount || 0}`,
      subtitle: "Completed Orders",
      icon: "shopping-bag",
      trend: "up",
      trendValue: "Live",
    },
  ];

  // Mock data for UI placeholders
  const paymentMethods = [
    { method: "Cash", amount: stats.revenue || 0 },
  ];

  const topSelling = [
    "Chicken Shawarma",
    "Zinger Burger",
    "Arabic Tea",
  ];

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Reports & Analytics"
      stats={dashboardStats}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Revenue */}
        <PriceCard
          title="Today's Revenue"
          amount={stats.revenue || 0}
          subtitle="Total Sales"
          icon="payments"
          badge="LIVE"
          badgeVariant="success"
        />

        <View style={styles.space} />

        <PriceCard
          title="Avg Bill Value"
          amount={stats.averageBillValue || 0}
          subtitle="Per Order"
          icon="receipt"
          badge="Avg"
          badgeVariant="primary"
        />

        <View style={styles.space} />

        <PriceCard
          title="Total Tax Collected"
          amount={stats.totalTax || 0}
          subtitle="CGST + SGST"
          icon="account-balance-wallet"
          badge="Tax"
          badgeVariant="warning"
        />

        <View style={styles.space} />

        {/* Top Selling */}
        <Card elevation="medium">
          <Text variant="heading3">
            Top Selling Items (Demo)
          </Text>
          <Divider />
          {topSelling.map((item, index) => (
            <View key={index} style={styles.row}>
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
            <View key={index} style={styles.row}>
              <Text variant="body">
                {item.method}
              </Text>
              <Text variant="subtitle" color={Theme.colors.success}>
                ₹{(item.amount || 0).toLocaleString("en-IN")}
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
  space: { height: Theme.spacing.lg },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: Theme.spacing.sm,
  },
  button: { marginTop: Theme.spacing.lg },
});

export default Reports;
