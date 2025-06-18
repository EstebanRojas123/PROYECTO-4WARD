import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { registerUser } from "../services/authService";

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
    <View>
      <Text>Registro</Text>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
      />
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <Text onPress={() => navigation.navigate("Login")}>
        ¿Ya tienes cuenta? Inicia sesión
      </Text>
    </View>
  );
}
