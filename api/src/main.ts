import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const config = app.get(ConfigService);
  const PORT =config.get('PORT') || 8080
  await app.listen(PORT, () => {
    logger.log(`Listening at http://localhost:${PORT}`);
    logger.log(`Running in ${config.get('NODE_ENV')} mode`);
  });
}
bootstrap();
