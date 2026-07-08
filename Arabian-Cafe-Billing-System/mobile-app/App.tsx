import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';

import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { BillingProvider } from './src/context/BillingContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* @ts-ignore: React 19 types mismatch with react-redux Provider */}
      <StoreProvider store={store}>
        <SafeAreaProvider>
          {/* Wrap everything in all the contexts */}
          <ThemeProvider>
            <AuthProvider>
              <UserProvider>
                <BillingProvider>
                  
                  <StatusBar barStyle="dark-content" backgroundColor="#F8F6F2" />
                  
                  {/* RootNavigator handles switching between Auth and Main apps */}
                  <RootNavigator />
                  
                </BillingProvider>
              </UserProvider>
            </AuthProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
