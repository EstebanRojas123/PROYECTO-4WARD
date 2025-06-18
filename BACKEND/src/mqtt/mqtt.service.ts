import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { createMqttClient } from './mqtt.client';

@Injectable()
export class MqttService implements OnModuleDestroy {
  private client: mqtt.MqttClient;

  private lastTemperature: number | null = null;
  private lastHumidity: number | null = null;
  private lastUpdateTime: Date | null = null;

  constructor(private configService: ConfigService) {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');

    if (!brokerUrl) {
      throw new Error('❌ MQTT_BROKER_URL no definido en .env');
    }

    this.client = createMqttClient(brokerUrl);

    this.client.on('connect', () => {
      this.client.subscribe('arduino/temp');
      this.client.subscribe('arduino/humidity');
    });

    this.client.on('message', (topic, payload) => {
      const value = parseFloat(payload.toString());

      if (topic === 'arduino/temp') {
        this.lastTemperature = value;
        this.lastUpdateTime = new Date();
        //console.log(`🌡️ Temperatura recibida: ${value}°C`);
      } else if (topic === 'arduino/humidity') {
        this.lastHumidity = value;
        this.lastUpdateTime = new Date();
        // console.log(`💧 Humedad recibida: ${value}%`);
      }
    });
  }

  sendCommand(topic: string, message: string) {
    this.client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) console.error('❌ Error al publicar:', err.message);
      else console.log(`✅ Comando enviado: ${topic} -> ${message}`);
    });
    return { status: 'ok', sent: { topic, message } };
  }

  getLastReading() {
    return {
      temp: this.lastTemperature,
      humedad: this.lastHumidity,
      updatedAt: this.lastUpdateTime,
    };
  }

  onModuleDestroy() {
    this.client?.end();
  }
}
