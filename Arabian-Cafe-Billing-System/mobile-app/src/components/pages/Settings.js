import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
} from "react-native";

import Theme from "../../styles/theme";

import DashboardLayout from "../templates/DashboardLayout";

import Card from "../atoms/Card";
import Text from "../atoms/Text";
import Input from "../atoms/Input";
import Switch from "../atoms/Switch";
import Button from "../atoms/Button";
import Divider from "../atoms/Divider";
import Select from "../atoms/Select";

const Settings = ({ navigation }) => {
  const [restaurantName, setRestaurantName] = useState("ArabianCafe");
  const [ownerName, setOwnerName] = useState("Administrator");
  const [phone, setPhone] = useState("9876543210");
  const [gst, setGst] = useState("18");
  const [printer, setPrinter] = useState("thermal");

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPrint, setAutoPrint] = useState(true);

  const printerOptions = [
    {
      label: "Thermal Printer",
      value: "thermal",
    },
    {
      label: "Bluetooth Printer",
      value: "bluetooth",
    },
    {
      label: "USB Printer",
      value: "usb",
    },
  ];

  const saveSettings = () => {
    Alert.alert(
      "Success",
      "Settings saved successfully."
    );
  };

  const backupData = () => {
    Alert.alert(
      "Backup",
      "Backup started."
    );
  };

  const restoreData = () => {
    Alert.alert(
      "Restore",
      "Restore started."
    );
  };

  const logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: () =>
            navigation.replace("Login"),
        },
      ]
    );
  };

  return (
    <DashboardLayout
      title="ArabianCafe"
      subtitle="Settings"
      stats={[]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Restaurant */}

        <Card elevation="medium">
          <Text variant="heading3">
            Restaurant Information
          </Text>

          <Divider />

          <Input
            label="Restaurant Name"
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <Input
            label="Owner Name"
            value={ownerName}
            onChangeText={setOwnerName}
          />

          <Input
            label="Phone Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Input
            label="GST (%)"
            keyboardType="numeric"
            value={gst}
            onChangeText={setGst}
          />
        </Card>

        <View style={styles.space} />

        {/* Printer */}

        <Card elevation="medium">
          <Text variant="heading3">
            Printer Settings
          </Text>

          <Divider />

          <Select
            label="Printer Type"
            selectedValue={printer}
            onValueChange={setPrinter}
            items={printerOptions}
          />

          <Switch
            label="Auto Print Bill"
            value={autoPrint}
            onValueChange={setAutoPrint}
          />
        </Card>

        <View style={styles.space} />

        {/* Preferences */}

        <Card elevation="medium">
          <Text variant="heading3">
            Preferences
          </Text>

          <Divider />

          <Switch
            label="Dark Mode"
            value={darkMode}
            onValueChange={setDarkMode}
          />

          <Switch
            label="Notifications"
            value={notifications}
            onValueChange={setNotifications}
          />
        </Card>

        <View style={styles.space} />

        {/* Backup */}

        <Card elevation="medium">
          <Text variant="heading3">
            Backup & Restore
          </Text>

          <Divider />

          <Button
            title="Backup Data"
            onPress={backupData}
          />

          <Button
            title="Restore Data"
            variant="secondary"
            onPress={restoreData}
            style={styles.button}
          />
        </Card>

        <View style={styles.space} />

        {/* Save */}

        <Button
          title="Save Settings"
          onPress={saveSettings}
        />

        <Button
          title="Logout"
          variant="danger"
          onPress={logout}
          style={styles.button}
        />

        <Text
          variant="caption"
          align="center"
          color={Theme.colors.textSecondary}
          style={styles.version}
        >
          ArabianCafe Billing App v1.0.0
        </Text>
      </ScrollView>
    </DashboardLayout>
  );
};

const styles = StyleSheet.create({
  space: {
    height: Theme.spacing.lg,
  },

  button: {
    marginTop: Theme.spacing.md,
  },

  version: {
    marginVertical: Theme.spacing.xxxl,
  },
});

export default Settings;