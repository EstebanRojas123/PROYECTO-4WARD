import { Controller, Get } from '@nestjs/common';
import { ResumenTemperaturaService } from './resumen-temperatura.service';

@Controller('historial')
export class ResumenTemperaturaController {
  constructor(private readonly resumenService: ResumenTemperaturaService) {}

  @Get()
  async obtenerHistorialCompleto() {
    return this.resumenService.obtenerTodos();
  }
}
