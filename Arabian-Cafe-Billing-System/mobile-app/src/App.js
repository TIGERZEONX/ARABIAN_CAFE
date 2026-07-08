import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

import store from './store/store';
import RootNavigator from './navigation/RootNavigator';

// Bring back your original contexts, plus the new ones
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { BillingProvider } from './context/BillingContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider store={store}>
        <SafeAreaProvider style={{ flex: 1 }}>
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
