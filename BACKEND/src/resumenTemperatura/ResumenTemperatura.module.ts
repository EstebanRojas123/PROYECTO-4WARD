import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenTemperatura } from './resumen-temperatura.entity';
import { Temperatura } from '../temperatura/temperatura.entity';
import { ResumenTemperaturaService } from './resumen-temperatura.service';
import { ResumenTemperaturaController } from './resumen-temperatura.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ResumenTemperatura, Temperatura])],
  providers: [ResumenTemperaturaService],
  controllers: [ResumenTemperaturaController],
  exports: [ResumenTemperaturaModule],
})
export class ResumenTemperaturaModule {}
