import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import DateObjectDto from './dto/dateObject.dto';
import LogStringObject from './dto/LogStringObject.dto';
const coloursTxt = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m', // Scarlet
  },
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m',
  },
};

export class LoggerFile implements LoggerService {
  /**
   * Write a 'log' level log.
   */

  log(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    const logString: LogStringObject = this.getLogString(
      'LOG',
      dateObject,
      message,
      optionalParams,
    );
    console.log(logString.colored);
    this.fsToFile(logString.clean, dateObject);
  }

  /**
   * Write an 'error' level log.
   */

  error(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    const logString: LogStringObject = this.getLogString(
      'ERROR',
      dateObject,
      message,
      optionalParams,
    );
    console.error(logString.colored);
    this.fsToFile(logString.clean, dateObject);
  }

  /**
   * Write a 'warn' level log.
   */

  warn(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    const logString: LogStringObject = this.getLogString(
      'WARN',
      dateObject,
      message,
      optionalParams,
    );
    console.warn(logString.colored);
    this.fsToFile(logString.clean, dateObject);
  }

  /**
   * Write a 'debug' level log.
   */

  debug?(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    const logString: LogStringObject = this.getLogString(
      'DEBUG',
      dateObject,
      message,
      optionalParams,
    );
    console.debug(logString.colored);
    this.fsToFile(logString.clean, dateObject);
  }

  /**
   * Write a 'verbose' level log.
   */

  verbose?(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    const logString: LogStringObject = this.getLogString(
      'VERBOSE',
      dateObject,
      message,
      optionalParams,
    );
    console.debug(logString.colored);
    this.fsToFile(logString.clean, dateObject);
  }

  /*
   * Fonction qui prend en paramètre le type de log et les paramètres reçu des fonctions
   * du LoggerService afin d'écrire dans le message dans un fichier texte
   */

  fsToFile(logString: string, dateObject: DateObjectDto) {
    // creation du dossier de logs si il n'existe pas
    const dir = './logs';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // assignation du nom du fichier txt de log
    const myFile = `logs/${dateObject.day}-${dateObject.month}-${dateObject.year}-log.txt`;

    // ecriture du log dans le fichier txt
    const log = fs.createWriteStream(myFile, { flags: 'a' });
    log.write(logString + '\n');
    log.end();
  }

  getLogString(
    type: string,
    dateObject: DateObjectDto,
    message: string,
    ...optionalParams: any[]
  ): LogStringObject {
    const logDateString = `${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds}`;

    let typeColor = '';
    switch (type) {
      case 'LOG':
        typeColor = coloursTxt.fg.green;
        break;
      case 'ERROR':
        typeColor = coloursTxt.fg.red;
        break;
      default:
        typeColor = coloursTxt.fg.yellow;
        break;
    }
    return {
      colored: `${typeColor}[${type}] ${coloursTxt.fg.blue}${logDateString} ${coloursTxt.fg.yellow}[${optionalParams}] ${typeColor}${message}${coloursTxt.reset}`,
      clean: `[${type}] ${logDateString} [${optionalParams}] ${message}`,
    };
  }

  getDateObjet(): DateObjectDto {
    const date = new Date();
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + date.getMonth() + 1).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return {
      day,
      month,
      year,
      hours,
      minutes,
      seconds,
    };
  }
}
