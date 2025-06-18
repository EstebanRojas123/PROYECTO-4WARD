import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Pantalla de Inicio</Text>
      <Text style={styles.subtitle}>¡Bienvenido al sistema de control!</Text>

      <Button
        title="Ir a Login"
        onPress={() => navigation.navigate("Login")}
        color="#6200ee"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: "#555",
  },
});
