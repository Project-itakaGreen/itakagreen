import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import * as session from 'express-session';

import * as passport from 'passport';

import { AppModule } from './app/app.module';

import { LoggerFile } from './app/LoggerFile'

async function bootstrap() {
   const app = await NestFactory.create(AppModule,
  {
    logger: new LoggerFile(),
  });
  const logger: Logger = new Logger('Main');
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
  const PORT: number = config.get('PORT') || 8080
  
  await app.listen(PORT, () => {
    logger.log(`Listening at http://localhost:${PORT}`);
    logger.log(`Running in ${config.get('NODE_ENV')} mode`);
  });

}

bootstrap();
