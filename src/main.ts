import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { PORT, HOST } = process.env;
  await app.listen(PORT, HOST);
  Logger.log(`Server listening on http://${HOST}:${PORT}`, 'NestApplication');
}
bootstrap();
