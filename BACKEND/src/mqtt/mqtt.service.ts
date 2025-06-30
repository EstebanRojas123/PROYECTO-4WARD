import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { createMqttClient } from './mqtt.client';
import { TemperaturaService } from 'src/temperatura/temperatura.service';

@Injectable()
export class MqttService implements OnModuleDestroy {
  private client: mqtt.MqttClient;

  private ambientTemp: number | null = null;
  private stoveTemp: number | null = null;
  private lastAmbientUpdate: Date | null = null;
  private lastStoveUpdate: Date | null = null;
  constructor(
    private configService: ConfigService,
    private readonly temperaturaService: TemperaturaService,
  ) {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');

    if (!brokerUrl) {
      throw new Error('❌ MQTT_BROKER_URL no definido en .env');
    }

    this.client = createMqttClient(brokerUrl);

    this.client.on('connect', () => {
      this.client.subscribe('sensor/ambient/temperature');
      this.client.subscribe('sensor/stove/temperature');
    });

    this.client.on('message', (topic, payload) => {
      const value = parseFloat(payload.toString());

      if (topic === 'sensor/ambient/temperature') {
        this.ambientTemp = value;
        this.lastAmbientUpdate = new Date();
        this.temperaturaService.guardarTemperatura(value);
      } else if (topic === 'sensor/stove/temperature') {
        this.stoveTemp = value;
        this.lastStoveUpdate = new Date();
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

  getAmbientTemperature() {
    return {
      temperature: this.ambientTemp,
      updatedAt: this.lastAmbientUpdate,
    };
  }

  getStoveTemperature() {
    return {
      temperature: this.stoveTemp,
      updatedAt: this.lastStoveUpdate,
    };
  }

  onModuleDestroy() {
    this.client?.end();
  }
}
