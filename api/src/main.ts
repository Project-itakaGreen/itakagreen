import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';

import { AppModule } from './app/app.module';
import { LoggerFile } from './app/LoggerFile';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerFile(),
  });
  const logger: Logger = new Logger('Main');
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config.get('GLOBAL_PREFIX'));
  app.use(
    session({
      secret: config.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const PORT: number = config.get('PORT') || 8080;

  await app.listen(PORT, () => {
    logger.log(
      `Listening at http://localhost:${PORT}/${config.get('GLOBAL_PREFIX')}`,
    );
    logger.log(`Running in ${config.get('NODE_ENV')} mode`);
  });
}

bootstrap();
