import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';

import * as session from 'express-session';

import * as passport from 'passport';

import { AppModule } from './app/app.module';

import { LoggerService } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule,
  {
    logger: new LoggerFile(),
  });

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX);
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
  await app.listen(process.env.PORT);
}

export class LoggerFile implements LoggerService
{
  /**
    * Write a 'log' level log.
    */

  log(message: any, ...optionalParams: any[]) {

    this.fsToFile('LOG',message,optionalParams);

  }

  /**
    * Write an 'error' level log.
    */

  error(message: any, ...optionalParams: any[]) {

    this.fsToFile('ERROR',message,optionalParams);

  }

  /**
    * Write a 'warn' level log.
    */

  warn(message: any, ...optionalParams: any[]) {

    this.fsToFile('WARN',message,optionalParams);

  }

  /**
    * Write a 'debug' level log.
    */

  debug?(message: any, ...optionalParams: any[]) {

    this.fsToFile('DEBUG',message,optionalParams);

  }

  /**
    * Write a 'verbose' level log.
    */

  verbose?(message: any, ...optionalParams: any[]) {

    this.fsToFile('VERBOSE',message,optionalParams);

  }


  /*
  * Fonction qui prend en paramètre le type de log et les paramètres reçu des fonctions
  * du LoggerService afin d'écrire dans le message dans un fichier texte
  */

  fsToFile(type: any, message: any, ...optionalParams: any[])
  {
    const fs = require('fs');

    // recuperation de la date

    let date = new Date();

    let day = ('0'+date.getDate()).slice(-2);

    let month = ('0'+date.getMonth()+1).slice(-2);

    let year = date.getFullYear();

    let hours = ('0'+date.getHours()).slice(-2);

    let minutes = ('0'+date.getMinutes()).slice(-2);

    let seconds = ('0'+date.getSeconds()).slice(-2);

    // creation du dossier de logs si il n'existe pas
    let dir = './logs';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    // assignation du nom du fichier txt de log
    let myFile = `logs/${day}-${month}-${year}-log.txt`;

    // ecriture du log dans le fichier txt
    let log = fs.createWriteStream(myFile,{ flags: 'a'});
    log.write(`[${type}] ${day}-${month}-${year} ${hours}:${minutes}:${seconds}  [${optionalParams}]  ${message}\n`);
    log.end();
  }
}

bootstrap();
