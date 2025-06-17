import { Controller, Post, Query } from '@nestjs/common';
import { TemperaturaService } from './temperatura.service';

@Controller('temperatura')
export class TemperaturaController {
  constructor(private readonly tempService: TemperaturaService) {}

  @Post('insertar')
  insertar(@Query('cantidad') cantidad = 10) {
    return this.tempService.insertarAleatorias(Number(cantidad));
  }
}
