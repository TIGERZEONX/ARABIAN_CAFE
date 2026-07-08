import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator'; 
import useAuth from '../hooks/useAuth'; 


const RootNavigator = () => {
  const { isAuthenticated, loadUser } = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  
  useEffect(() => {
    const initAuth = async () => {
      try {
        await loadUser();
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setIsInitializing(false);
      }
    };
    initAuth();
  }, [loadUser]);
  
  if (isInitializing) {
    return null; // Or return a <SplashScreen /> here
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
