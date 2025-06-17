import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Temperatura } from './temperatura.entity';

@Injectable()
export class TemperaturaService {
  constructor(
    @InjectRepository(Temperatura)
    private tempRepo: Repository<Temperatura>,
  ) {}

  async insertarAleatorias(cantidad: number) {
    for (let i = 0; i < cantidad; i++) {
      const temp = parseFloat((Math.random() * (30 - 15) + 15).toFixed(2));
      const nueva = this.tempRepo.create({ temp });
      await this.tempRepo.save(nueva);
      console.log(`[${i + 1}/${cantidad}] Temp insertada: ${temp}°C`);
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
