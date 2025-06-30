import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";

export default function Historial() {
  const [data, setData] = useState([]);

  const fetchHistorial = async () => {
    try {
      const res = await axios.get("http://localhost:3000/historial"); // o IP local
      setData(res.data);
    } catch (error) {
      console.error("❌ Error al obtener historial:", error.message);
    }
  };

  useEffect(() => {
    fetchHistorial();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.fecha}>
        🕓 {new Date(item.fecha).toLocaleString()}
      </Text>
      <Text>🔺 Máx: {item.max} °C</Text>
      <Text>🔻 Mín: {item.min} °C</Text>
      <Text>📊 Promedio: {item.promedio} °C</Text>
      <Text>📦 Muestras: {item.cantidad}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Historial de Temperaturas</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  fecha: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
