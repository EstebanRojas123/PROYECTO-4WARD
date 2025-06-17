import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';
import { createMqttClient } from './mqtt.client';

@Injectable()
export class MqttService implements OnModuleDestroy {
  private client: mqtt.MqttClient;

  constructor(private configService: ConfigService) {
    const brokerUrl = this.configService.get<string>('MQTT_BROKER_URL');

    if (!brokerUrl) {
      throw new Error('❌ MQTT_BROKER_URL no definido en .env');
    }

    this.client = createMqttClient(brokerUrl);
  }

  sendCommand(topic: string, message: string) {
    this.client.publish(topic, message, { qos: 1 }, (err) => {
      if (err) console.error('❌ Error al publicar:', err.message);
      else console.log(`✅ Comando enviado: ${topic} -> ${message}`);
    });
    return { status: 'ok', sent: { topic, message } };
  }

  onModuleDestroy() {
    this.client?.end();
  }
}
