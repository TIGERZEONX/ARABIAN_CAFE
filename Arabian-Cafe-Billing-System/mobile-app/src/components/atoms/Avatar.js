import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

import Theme from "../../styles/theme";

const Avatar = ({
  source = null,
  name = "",
  size = "medium",
  shape = "circle",
  backgroundColor = Theme.colors.primary,
  textColor = Theme.colors.white,
  status = null, // "online" | "offline" | "busy" | null
  onPress,
  style = {},
}) => {
  const Component = onPress ? Pressable : View;

  const getInitials = (fullName) => {
    if (!fullName) return "?";

    const words = fullName.trim().split(" ");

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    return (
      words[0].charAt(0) +
      words[words.length - 1].charAt(0)
    ).toUpperCase();
  };

  const avatarSize = sizes[size] || sizes.medium;

  const borderRadius =
    shape === "square"
      ? Theme.spacing.radius.md
      : avatarSize.width / 2;

  const statusColor = {
    online: Theme.colors.success,
    offline: Theme.colors.textSecondary,
    busy: Theme.colors.danger,
  };

  return (
    <Component
      onPress={onPress}
      style={[
        styles.container,
        avatarSize,
        {
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    >
      {source ? (
        <Image
          source={source}
          resizeMode="cover"
          style={[
            styles.image,
            {
              borderRadius,
            },
          ]}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            {
              color: textColor,
              fontSize: avatarSize.fontSize,
            },
          ]}
        >
          {getInitials(name)}
        </Text>
      )}

      {status && (
        <View
          style={[
            styles.status,
            {
              backgroundColor:
                statusColor[status] || Theme.colors.success,
            },
          ]}
        />
      )}
    </Component>
  );
};

const sizes = {
  small: {
    width: 40,
    height: 40,
    fontSize: 16,
  },

  medium: {
    width: 56,
    height: 56,
    fontSize: 20,
  },

  large: {
    width: 72,
    height: 72,
    fontSize: 26,
  },

  extraLarge: {
    width: 100,
    height: 100,
    fontSize: 34,
  },
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",

    ...Theme.shadows.small,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  initials: {
    fontWeight: Theme.typography.fontWeight.bold,
  },

  status: {
    position: "absolute",

    width: 14,
    height: 14,

    borderRadius: 7,

    right: 2,
    bottom: 2,

    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
});

export default Avatar;