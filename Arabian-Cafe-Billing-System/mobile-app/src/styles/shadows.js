// src/styles/shadows.js

const Shadows = {
  // Small Shadow
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  // Medium Shadow
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
  },

  // Large Shadow
  large: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
  },

  // Extra Large Shadow (Dialogs / Bottom Sheets)
  extraLarge: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 14,
  },
};

export default Shadows;