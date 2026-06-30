import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Theme from "../../styles/theme";

const Icon = ({
  name,
  size = Theme.spacing.icon.lg,
  color = Theme.colors.primary,
  style,
  onPress,
}) => {
  return (
    <MaterialIcons
      name={name}
      size={size}
      color={color}
      style={style}
      onPress={onPress}
    />
  );
};

export default Icon;