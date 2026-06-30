import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../components/pages/Login";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;