import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Main");
    }, 1000); // 1 segundo, puedes aumentar si quieres

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200ee" />
      <Text style={styles.text}>Cargando sistema...</Text>
      <Image
        source={require("../../assets/estufa.png")}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: "#333",
  },
  image: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
});
