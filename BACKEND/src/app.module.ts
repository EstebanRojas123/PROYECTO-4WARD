import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqttModule } from './mqtt/mqtt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Temperatura } from './temperatura/temperatura.entity';
import { TemperaturaService } from './temperatura/temperatura.service';
import { TemperaturaController } from './temperatura/temperatura.controller';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';

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
      entities: [Temperatura, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Temperatura]),
    MqttModule,
    AuthModule,
  ],
  providers: [TemperaturaService],
  controllers: [TemperaturaController],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap() {
    console.log('Conexión a la base de datos exitosa!!');
  }
}
