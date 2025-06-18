import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { Text, TextInput, Button, StyleSheet } from "react-native";
import ScreenWrapper from "./ScreenWrapper";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await registerUser({ username, email, password });
      console.log("Usuario registrado correctamente");
      navigation.navigate("Login");
    } catch (err) {
      console.log("Error al registrar:", err.message);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput 
        placeholder="Email" 
        onChangeText={setEmail} 
        value={email}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        placeholderTextColor="#666"
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text style={styles.registerText}  onPress={() => navigation.navigate("Login")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  registerText: {
    color: "#ccc",
    marginTop: 15,
    textDecorationLine: "underline",
  },
});