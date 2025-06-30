import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Cambia a tu IP local si corres desde el celular

export const sendCommand = async (topic, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/mqtt/topic`, {
      topic,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error al enviar comando MQTT:", error.message);
    throw error;
  }
};

export const getAmbientTemperature = async () => {
  const res = await axios.get(`${BASE_URL}/mqtt/ambient`);
  return res.data;
};
