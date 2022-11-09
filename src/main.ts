// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import ValidationPipe from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(ValidationPipe);

  const { PORT, HOST } = process.env;
  await app.listen(PORT, HOST);
  Logger.log(`Server listening on http://${HOST}:${PORT}`, 'NestApplication');
}

bootstrap();
