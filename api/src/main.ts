import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  console.log(process.env.PORT);
  await app.listen(process.env.PORT);
}
bootstrap();
