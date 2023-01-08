import { Injectable, Logger } from '@nestjs/common';
import { LoggerFile } from './LoggerFile';

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  
  getHello(): string {
    return 'Hello World!';
  }

  // fonction qui récupère les fichiers du dossier logs afin de les lire 
  // et les afficher sur la page des logs
  getLogs(): string {
    const fs = require('fs');

    let files =  fs.readdirSync('logs');

    let content = '';

    files.reverse().forEach(element => {
      content += `${element}<br>`;
      let fileContent = fs.readFileSync(`logs/${element}`,'utf-8');
      fileContent.split(/\r?\n/).reverse().forEach(line => {
        content += `<br>${line}`;
      });
      content += '<br><br><br>';
    });

    return (content !== '')? content : "Pas de log";
  }
}
