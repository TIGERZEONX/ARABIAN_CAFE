import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator'; 
import useAuth from '../hooks/useAuth'; 


const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return null; // Or return a <SplashScreen /> here
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
