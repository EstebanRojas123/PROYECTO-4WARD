import { Module } from '@nestjs/common';
import { TemperaturaService } from './temperatura.service';
import { TemperaturaController } from './temperatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperatura } from './temperatura.entity';
import { ResumenTemperatura } from 'src/resumenTemperatura/resumen-temperatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperatura, ResumenTemperatura])],
  providers: [TemperaturaService],
  controllers: [TemperaturaController],
  exports: [TemperaturaService],
})
export class TemperaturaModule {}
