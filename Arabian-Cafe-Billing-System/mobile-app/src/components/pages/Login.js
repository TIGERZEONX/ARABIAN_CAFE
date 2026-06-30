import React, { useState } from "react";
import { Alert } from "react-native";

import LoginLayout from "../templates/LoginLayout";

import Input from "../atoms/Input";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim()) {
      Alert.alert("Validation", "Please enter username.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Validation", "Please enter password.");
      return;
    }

    try {
      setLoading(true);

      // API Call Here

      setTimeout(() => {
        setLoading(false);

        navigation.replace("Dashboard");
      }, 1500);
    } catch (error) {
      setLoading(false);

      Alert.alert("Error", "Login failed.");
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
        label="Username"
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
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