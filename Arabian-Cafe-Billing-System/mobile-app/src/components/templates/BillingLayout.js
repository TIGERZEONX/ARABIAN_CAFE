import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

import Header from "../organisms/Header";
import Cart from "../organisms/Cart";
import ProductGrid from "../organisms/ProductGrid";
import PaymentPanel from "../organisms/PaymentPanel";

import SearchBar from "../molecules/SearchBar";
import CustomerForm from "../molecules/CustomerForm";

const BillingLayout = ({
  // Header
  headerProps = {},

  // Search
  searchValue,
  onSearchChange,
  onSearch,
  onClearSearch,

  // Customer
  customerFormProps = {},

  // Products
  products = [],
  onAddToCart,

  // Cart
  cartItems = [],
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,

  // Payment
  paymentPanelProps = {},

  style = {},
}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      <Header
        title="ArabianCafe"
        subtitle="Billing"
        {...headerProps}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Search */}

        <SearchBar
          value={searchValue}
          onChangeText={onSearchChange}
          onSearch={onSearch}
          onClear={onClearSearch}
        />

        {/* Customer Details */}

        <CustomerForm
          {...customerFormProps}
        />

        {/* Products */}

        <View style={styles.section}>
          <ProductGrid
            products={products}
            onAddToCart={onAddToCart}
          />
        </View>

        {/* Cart */}

        <View style={styles.section}>
          <Cart
            items={cartItems}
            onIncrease={onIncreaseQuantity}
            onDecrease={onDecreaseQuantity}
            onDelete={onRemoveItem}
          />
        </View>

        {/* Payment */}

        <View style={styles.section}>
          <PaymentPanel
            {...paymentPanelProps}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  content: {
    padding: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xxxl,
  },

  section: {
    marginTop: Theme.spacing.xl,
  },
});

export default BillingLayout;