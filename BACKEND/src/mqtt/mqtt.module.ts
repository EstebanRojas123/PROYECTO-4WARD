import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { TemperaturaModule } from 'src/temperatura/temperatura.module';

@Module({
  providers: [MqttService],
  controllers: [MqttController],
  imports: [TemperaturaModule],
  exports: [MqttService],
})
export class MqttModule {}
