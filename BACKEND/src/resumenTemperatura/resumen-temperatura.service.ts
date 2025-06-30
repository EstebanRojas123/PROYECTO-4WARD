import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Temperatura } from '../temperatura/temperatura.entity';
import { ResumenTemperatura } from './resumen-temperatura.entity'; // <-- Asegúrate de importar esto

@Injectable()
export class ResumenTemperaturaService {
  constructor(
    @InjectRepository(Temperatura)
    private tempRepo: Repository<Temperatura>,

    @InjectRepository(ResumenTemperatura)
    private resumenRepo: Repository<ResumenTemperatura>, // <-- ¡Aquí lo agregas!
  ) {}

  async obtenerTodos() {
    return this.resumenRepo.find({
      order: { fecha: 'DESC' },
    });
  }
}
