import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useAuth } from '../../hooks/useAuth';

const Dashboard = ({ navigation }) => {
  // const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back!</Text>
      </View>

      <View style={styles.grid}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#E3F2FD' }]} // Light Blue
          onPress={() => navigation.navigate('Billing')} // Adjust route name based on your Navigator
        >
          <Text style={styles.cardTitle}>Billing</Text>
          <Text style={styles.cardDesc}>Create new invoices</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#E8F5E9' }]} // Light Green
          onPress={() => navigation.navigate('Inventory')}
        >
          <Text style={styles.cardTitle}>Inventory</Text>
          <Text style={styles.cardDesc}>Manage products</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#FFF3E0' }]} // Light Orange
          onPress={() => navigation.navigate('Customers')}
        >
          <Text style={styles.cardTitle}>Customers</Text>
          <Text style={styles.cardDesc}>View directory</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: '#FCE4EC' }]} // Light Pink
          onPress={() => navigation.navigate('Reports')}
        >
          <Text style={styles.cardTitle}>Reports</Text>
          <Text style={styles.cardDesc}>View analytics</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 24,
    paddingTop: 48,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    aspectRatio: 1, // Makes the cards square
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2, // For Android shadow
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
  }
});

export default Dashboard;
