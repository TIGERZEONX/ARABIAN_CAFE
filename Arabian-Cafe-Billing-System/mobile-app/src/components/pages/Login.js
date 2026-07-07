import React, { useState } from "react";
import { Alert } from "react-native";

import LoginLayout from "../templates/LoginLayout";
import Input from "../atoms/Input";
import useAuth from "../../hooks/useAuth"; 

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("admin@arabiancafe.com"); // Pre-filling a default email
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter email.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Validation", "Please enter password.");
      return;
    }

    try {
      setLoading(true);

      // Trigger the real Redux / API login
      const response = await login({ email: email.trim(), password });

      setLoading(false);

      if (response.success) {
        // Redux will likely auto-navigate because of RootNavigator, 
        // but we keep this just in case.
        navigation.replace("Dashboard");
      } else {
        Alert.alert("Error", response.message || "Invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Network request failed.");
    }
  };

  return (
    <LoginLayout
      title="ArabianCafe"
      subtitle="Restaurant Billing System"
      buttonTitle="Login"
      loading={loading}
      onLogin={handleLogin}
    >
      <Input
        label="Email"
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        label="Password"
        placeholder="Enter Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
    </LoginLayout>
  );
};

export default Login;
