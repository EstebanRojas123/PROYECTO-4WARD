import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { Text, TextInput, Button, StyleSheet } from "react-native";
import ScreenWrapper from "./ScreenWrapper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log("Login OK:", res);
      navigation.replace("Home");
    } catch (err) {
      console.log("Error al iniciar sesión:", err.message);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Login</Text>
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
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>
        ¿No tienes cuenta? Regístrate
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

