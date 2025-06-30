import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { sendCommand, getAmbientTemperature } from "../services/mqtt.service";
import { Dimensions } from "react-native";
import { estufaBase64 } from "../../assets/EstufaBase64";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
  const [ambientTemp, setAmbientTemp] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchTemperature = async () => {
    try {
      const res = await getAmbientTemperature();
      setAmbientTemp(res.temperature);
      setLastUpdate(res.updatedAt);
    } catch (err) {
      console.error("❌ Error al obtener temperatura:", err.message);
    }
  };

  useEffect(() => {
    fetchTemperature(); // primera llamada
    const interval = setInterval(fetchTemperature, 3000); // cada 3 seg
    return () => clearInterval(interval); // limpia al salir de la pantalla
  }, []);

  const handleRelay = async (relay, state) => {
    const topic = `arduino/relay${relay}`;
    await sendCommand(topic, state);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Pantalla de Inicio</Text>
      <Text style={styles.subtitle}>¡Bienvenido al sistema de control!</Text>

      <Image source={{ uri: estufaBase64 }} style={styles.estufa} />

      <View style={styles.temperatureBox}>
        <Text style={styles.tempLabel}>🌡️ Temperatura Ambiente:</Text>
        {ambientTemp !== null ? (
          <>
            <Text style={styles.tempValue}>{ambientTemp} °C</Text>
            <Text style={styles.timestamp}>
              Última actualización: {new Date(lastUpdate).toLocaleTimeString()}
            </Text>
          </>
        ) : (
          <Text style={styles.loading}>Cargando temperatura...</Text>
        )}
      </View>

      <View style={styles.controlsContainer}>
        {/* Botones de Relay 1 */}
        <View style={styles.relayControl}>
          <Text style={styles.relayText}>Relay 1</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonOn]}
            onPress={() => handleRelay(1, "on")}
          >
            <Text style={styles.buttonText}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonOff]}
            onPress={() => handleRelay(1, "off")}
          >
            <Text style={styles.buttonText}>OFF</Text>
          </TouchableOpacity>
        </View>

        {/* Botones de Relay 2 */}
        <View style={styles.relayControl}>
          <Text style={styles.relayText}>Relay 2</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonOn]}
            onPress={() => handleRelay(2, "on")}
          >
            <Text style={styles.buttonText}>ON</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonOff]}
            onPress={() => handleRelay(2, "off")}
          >
            <Text style={styles.buttonText}>OFF</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 40,
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
  estufa: {
    width: width * 0.7, // 70% del ancho de pantalla
    height: width * 0.7, // misma proporción para que no se deforme
    resizeMode: "contain",
    marginTop: 10,
    alignSelf: "center",
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  relayControl: {
    alignItems: "center",
  },
  relayText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginVertical: 4,
  },
  buttonOn: {
    backgroundColor: "#28a745", // verde
  },
  buttonOff: {
    backgroundColor: "#dc3545", // rojo
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  temperatureBox: {
    alignItems: "center",
    marginVertical: 20,
  },
  tempLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tempValue: {
    fontSize: 28,
    color: "#d84315",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "#777",
  },
  loading: {
    fontSize: 14,
    color: "#888",
  },
});
