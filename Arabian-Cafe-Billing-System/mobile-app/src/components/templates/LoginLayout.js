import React from "react";
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import Theme from "../../styles/theme";

import Text from "../atoms/Text";
import Button from "../atoms/Button";

const LoginLayout = ({
  logo = null,

  title = "ArabianCafe",
  subtitle = "Restaurant Billing System",

  children,

  buttonTitle = "Login",

  onLogin,

  loading = false,

  footerText = "© ArabianCafe",

  style = {},
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
        style={styles.keyboard}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}

          <View style={styles.logoContainer}>
            {logo ? (
              <Image
                source={logo}
                resizeMode="contain"
                style={styles.logo}
              />
            ) : null}

            <Text
              variant="heading1"
              align="center"
              style={styles.title}
            >
              {title}
            </Text>

            <Text
              variant="body"
              align="center"
              color={Theme.colors.textSecondary}
            >
              {subtitle}
            </Text>
          </View>

          {/* Login Form */}

          <View style={[styles.form, style]}>
            {children}

            <Button
              title={buttonTitle}
              loading={loading}
              onPress={onLogin}
              style={styles.button}
            />
          </View>

          {/* Footer */}

          <Text
            variant="caption"
            align="center"
            color={Theme.colors.textSecondary}
            style={styles.footer}
          >
            {footerText}
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  keyboard: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,

    justifyContent: "center",

    padding: Theme.spacing.xl,
  },

  logoContainer: {
    alignItems: "center",

    marginBottom: Theme.spacing.xxxl,
  },

  logo: {
    width: 120,
    height: 120,

    marginBottom: Theme.spacing.lg,
  },

  title: {
    marginBottom: Theme.spacing.sm,
  },

  form: {
    backgroundColor: Theme.colors.surface,

    borderRadius: Theme.spacing.radius.xxl,

    padding: Theme.spacing.xxl,

    ...Theme.shadows.large,
  },

  button: {
    marginTop: Theme.spacing.lg,
  },

  footer: {
    marginTop: Theme.spacing.xxxl,
  },
});

export default LoginLayout;