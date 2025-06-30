import { Controller, Post, Query } from '@nestjs/common';
import { TemperaturaService } from './temperatura.service';

@Controller('temperatura')
export class TemperaturaController {
  constructor(private readonly tempService: TemperaturaService) {}
}
