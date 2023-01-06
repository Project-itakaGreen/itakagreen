
import { Logger, LoggerService } from '@nestjs/common';



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

export class LoggerFile implements LoggerService
{

  /**
    * Write a 'log' level log.
    */

  log(message: any, ...optionalParams: any[]) {

    const dateObject = this.getDateObjet();
  console.log(
    `${coloursTxt.fg.green}[LOG] ${coloursTxt.fg.blue}${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds} ${coloursTxt.fg.yellow}[${optionalParams}]${coloursTxt.fg.green} ${message}`,
  );
    this.fsToFile('LOG',message,optionalParams);

  }

  /**
    * Write an 'error' level log.
    */

  error(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    console.error(
      `${coloursTxt.fg.red}[ERROR] ${coloursTxt.fg.blue}${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds} ${coloursTxt.fg.yellow}[${optionalParams}]${coloursTxt.fg.red} ${message}`,
    );
    this.fsToFile('ERROR',message,optionalParams);

  }

  /**
    * Write a 'warn' level log.
    */

  warn(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    console.warn(
      `${coloursTxt.fg.yellow}[WARN] ${coloursTxt.fg.blue}${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds} ${coloursTxt.fg.yellow}[${optionalParams}]${coloursTxt.fg.yellow} ${message}`,
    );
    this.fsToFile('WARN',message,optionalParams);

  }

  /**
    * Write a 'debug' level log.
    */

  debug?(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    console.debug(
      `${coloursTxt.fg.yellow}[DEBUG] ${coloursTxt.fg.blue}${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds} ${coloursTxt.fg.yellow}[${optionalParams}]${coloursTxt.fg.yellow} ${message}`,
    );
    this.fsToFile('DEBUG',message,optionalParams);

  }

  /**
    * Write a 'verbose' level log.
    */

  verbose?(message: any, ...optionalParams: any[]) {
    const dateObject = this.getDateObjet();
    console.debug(
      `${coloursTxt.fg.yellow}[VERBOSE] ${coloursTxt.fg.blue}${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds} ${coloursTxt.fg.yellow}[${optionalParams}]${coloursTxt.fg.yellow} ${message}`,
    );
    this.fsToFile('VERBOSE',message,optionalParams);

  }


  /*
  * Fonction qui prend en paramètre le type de log et les paramètres reçu des fonctions
  * du LoggerService afin d'écrire dans le message dans un fichier texte
  */

  fsToFile(dateObject: any, type: any, message: any, ...optionalParams: any[])
  {
    const fs = require('fs');

    // creation du dossier de logs si il n'existe pas
    let dir = './logs';

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    // assignation du nom du fichier txt de log
    let myFile = `logs/${dateObject.day}-${dateObject.month}-${dateObject.year}-log.txt`;

    // ecriture du log dans le fichier txt
    let log = fs.createWriteStream(myFile,{ flags: 'a'});
    log.write(`[${type}] ${dateObject.day}-${dateObject.month}-${dateObject.year} ${dateObject.hours}:${dateObject.minutes}:${dateObject.seconds}  [${optionalParams}]  ${message}\n`);
    log.end();
  }

  getDateObjet()
  {
    let date = new Date();

    let day = ('0'+date.getDate()).slice(-2);

    let month = ('0'+date.getMonth()+1).slice(-2);

    let year = date.getFullYear();

    let hours = ('0'+date.getHours()).slice(-2);

    let minutes = ('0'+date.getMinutes()).slice(-2);

    let seconds = ('0'+date.getSeconds()).slice(-2);

    return {
      day,
      month,
      year,
      hours,
      minutes,
      seconds
    }
  }


}