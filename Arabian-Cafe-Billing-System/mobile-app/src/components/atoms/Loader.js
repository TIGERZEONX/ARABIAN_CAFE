import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

const Loader = ({
  visible = true,
  text = "",
  size = "large",
  color = Theme.colors.primary,
  overlay = false,
  style = {},
  textStyle = {},
}) => {
  if (!visible) return null;

  const Container = overlay ? styles.overlay : styles.container;

  return (
    <View style={[Container, style]}>
      <ActivityIndicator
        size={size}
        color={color}
      />

      {text ? (
        <Text style={[styles.text, textStyle]}>
          {text}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xxl,
  },

  overlay: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(248,246,242,0.85)",

    zIndex: 999,
  },

  text: {
    marginTop: Theme.spacing.md,

    fontSize: Theme.typography.fontSize.base,

    fontWeight: Theme.typography.fontWeight.medium,

    color: Theme.colors.textPrimary,

    textAlign: "center",
  },
});

export default Loader;