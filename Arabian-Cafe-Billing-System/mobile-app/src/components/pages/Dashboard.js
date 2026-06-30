import React from "react";
import { View, StyleSheet } from "react-native";

import DashboardLayout from "../templates/DashboardLayout";

import PriceCard from "../molecules/PriceCard";

import Theme from "../../styles/theme";

const Dashboard = ({ navigation }) => {
  const stats = [
    {
      id: 1,
      title: "Today's Sales",
      value: "₹12,450",
      subtitle: "Today's Revenue",
      icon: "payments",
      trend: "up",
      trendValue: "+12%",
    },
    {
      id: 2,
      title: "Orders",
      value: "128",
      subtitle: "Completed Orders",
      icon: "shopping-bag",
      trend: "up",
      trendValue: "+8%",
    },
    {
      id: 3,
      title: "Customers",
      value: "84",
      subtitle: "Today's Customers",
      icon: "people",
      trend: "up",
      trendValue: "+5%",
    },
    {
      id: 4,
      title: "Pending Bills",
      value: "6",
      subtitle: "Waiting for Payment",
      icon: "receipt-long",
      trend: "down",
      trendValue: "-2%",
    },
  ];

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Dashboard"
      stats={stats}
      headerProps={{
        profileName: "Administrator",
        onMenuPress: () => {},
        onNotificationPress: () => {},
        onProfilePress: () => {},
      }}
    >
      <View style={styles.cards}>
        <PriceCard
          title="Monthly Revenue"
          amount={345670}
          subtitle="Current Month"
          icon="account-balance-wallet"
          badge="LIVE"
          badgeVariant="success"
        />

        <View style={styles.space} />

        <PriceCard
          title="Pending Collection"
          amount={18540}
          subtitle="Awaiting Payment"
          icon="receipt"
          badge="Pending"
          badgeVariant="warning"
        />
      </View>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  cards: {
    marginTop: Theme.spacing.lg,
  },

  space: {
    height: Theme.spacing.lg,
  },
});

export default Dashboard;