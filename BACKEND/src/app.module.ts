import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperatura } from './temperatura/temperatura.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { ResumenTemperaturaModule } from './resumenTemperatura/ResumenTemperatura.module';
import { ResumenTemperatura } from './resumenTemperatura/resumen-temperatura.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { TemperaturaModule } from './temperatura/temperatura.module'; // 👈 AGREGA ESTO

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '123',
      database: process.env.DB_NAME || 'estufa',
      entities: [Temperatura, User, ResumenTemperatura],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Temperatura]),

    // 👇 Módulos de la app
    TemperaturaModule,
    MqttModule,
    AuthModule,
    ResumenTemperaturaModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log('Conexión a la base de datos exitosa!!');
  }
}
