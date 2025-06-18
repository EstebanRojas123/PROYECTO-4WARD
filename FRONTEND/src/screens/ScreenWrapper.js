// src/components/ScreenWrapper.js
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ScreenWrapper({ children }) {
  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#1a1f36", // azul oscuro matte
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
