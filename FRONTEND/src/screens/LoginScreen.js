import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { loginUser } from "../services/authService";

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
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Text onPress={() => navigation.navigate("Register")}>
        ¿No tienes cuenta? Regístrate
      </Text>
    </View>
  );
}
