import * as mqtt from 'mqtt';

export function createMqttClient(brokerUrl: string): mqtt.MqttClient {
  const client = mqtt.connect(brokerUrl);

  client.on('connect', () => {
    console.log(`✅ Conectado al broker MQTT (${brokerUrl})`);
  });

  client.on('error', (err) => {
    console.error('❗ Error MQTT:', err.message);
  });

  client.on('close', () => {
    console.warn('⚠️ Conexión MQTT cerrada');
  });

  client.on('reconnect', () => {
    console.log('🔁 Reintentando conexión MQTT...');
  });

  return client;
}
