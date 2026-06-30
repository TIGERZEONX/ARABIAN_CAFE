import React from "react";
import { View, StyleSheet } from "react-native";
import Theme from "../../styles/theme";

const Divider = ({
  orientation = "horizontal",
  color = Theme.colors.border,
  thickness = 1,
  marginVertical = Theme.spacing.md,
  marginHorizontal = 0,
  length = "100%",
  style = {},
}) => {
  const dividerStyle =
    orientation === "vertical"
      ? {
          width: thickness,
          height: length,
          backgroundColor: color,
          marginHorizontal,
        }
      : {
          height: thickness,
          width: length,
          backgroundColor: color,
          marginVertical,
        };

  return <View style={[styles.divider, dividerStyle, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: "stretch",
  },
});

export default Divider;