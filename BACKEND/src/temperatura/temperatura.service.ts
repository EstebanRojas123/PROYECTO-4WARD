import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Temperatura } from './temperatura.entity';
import { ResumenTemperatura } from '../resumenTemperatura/resumen-temperatura.entity';

@Injectable()
export class TemperaturaService {
  constructor(
    @InjectRepository(Temperatura)
    private tempRepo: Repository<Temperatura>,

    @InjectRepository(ResumenTemperatura)
    private resumenRepo: Repository<ResumenTemperatura>,
  ) {}

  async guardarTemperatura(temp: number) {
    // Guardar temperatura en tabla principal
    const nueva = this.tempRepo.create({ temp });
    await this.tempRepo.save(nueva);
    console.log(`🌡️ Temp guardada en BD: ${temp}°C`);

    // Obtener fecha de hoy (inicio y fin del día)
    const hoy = new Date();
    const inicio = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate(),
      0,
      0,
      0,
    );
    const fin = new Date(
      hoy.getFullYear(),
      hoy.getMonth(),
      hoy.getDate(),
      23,
      59,
      59,
    );

    // Buscar resumen del día
    let resumen = await this.resumenRepo.findOne({
      where: {
        fecha: Between(inicio, fin),
      },
    });

    if (!resumen) {
      // Crear nuevo resumen si no existe
      resumen = this.resumenRepo.create({
        fecha: new Date(), // puede ser `hoy`, pero esto es más explícito
        max: temp,
        min: temp,
        promedio: temp,
        cantidad: 1,
      });
    } else {
      // Actualizar resumen existente
      resumen.max = Math.max(resumen.max, temp);
      resumen.min = Math.min(resumen.min, temp);
      resumen.promedio = parseFloat(
        (
          (resumen.promedio * resumen.cantidad + temp) /
          (resumen.cantidad + 1)
        ).toFixed(2),
      );
      resumen.cantidad += 1;
    }

    // Guardar resumen
    await this.resumenRepo.save(resumen);
  }
}
