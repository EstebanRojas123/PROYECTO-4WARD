import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Home() {
  const handlePress = () => {
    console.log("Botón presionado");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Inicio</Text>
      <Text style={styles.subtitle}>Bienvenido al sistema de control</Text>

      <TextInput placeholder="username" style={styles.button} />
      <TextInput placeholder="password" style={styles.button} />

      <TouchableOpacity style={styles.button}>
        <text>Registrate aqui!</text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    textAlign: "center",
    marginTop: "10px",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },

  register:{
    color: 'black',
  }

});
