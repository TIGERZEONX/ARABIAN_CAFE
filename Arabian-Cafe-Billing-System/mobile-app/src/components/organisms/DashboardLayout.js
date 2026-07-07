import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Header from "../organisms/Header";
import DashboardStats from "../organisms/DashboardStats";

const DashboardLayout = ({
  title = "ArabianCafe",
  subtitle = "Dashboard",

  stats = [],

  headerProps = {},

  children,

  style = {},
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}

      <Header
        title={title}
        subtitle={subtitle}
        {...headerProps}
      />

      {/* Body */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {/* Dashboard Statistics */}

        <DashboardStats
          stats={stats}
        />

        {/* Additional Widgets */}

        <View style={[styles.content, style]}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  scrollContainer: {
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xxxl,
  },

  content: {
    marginTop: Theme.spacing.lg,
  },
});

export default DashboardLayout;