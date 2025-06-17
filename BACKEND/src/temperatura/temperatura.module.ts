import { Module } from '@nestjs/common';
import { TemperaturaService } from './temperatura.service';
import { TemperaturaController } from './temperatura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperatura } from './temperatura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperatura])],
  providers: [TemperaturaService],
  controllers: [TemperaturaController],
})
export class TemperaturaModule {}