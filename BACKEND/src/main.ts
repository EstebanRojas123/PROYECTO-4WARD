import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
      origin: 'http://localhost:8081', // URL de tu frontend (Expo Web o React Native Web)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
  });

  await app.listen(3000);
  console.log('API corriendo en http://localhost:3000');
}
bootstrap();
