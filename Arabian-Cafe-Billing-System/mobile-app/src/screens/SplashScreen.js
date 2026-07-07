import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
// import { useAuth } from '../hooks/useAuth'; // Uncomment when ready to check auth state

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Simulate loading or check auth status here
    const timer = setTimeout(() => {
      // navigation.replace('Auth'); // or 'Main' based on auth state
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme?.colors?.background || '#ffffff' }]}>
      <ActivityIndicator size="large" color={theme?.colors?.primary || '#0000ff'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
