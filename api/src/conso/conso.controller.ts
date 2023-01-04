import { Controller, Get } from '@nestjs/common';

import { ConsoService } from './conso.service';

@Controller('conso')
export class ConsoController {

    constructor(private readonly consoService: ConsoService) {}

    @Get()
    hello():string {
        return 'Bienvenue sur les consos'
    }

    @Get('total')
    getTotal(): string {
        return this.consoService.getTotal();
      }

    @Get('day')
    getDay(): string {
        return this.consoService.getDay();
      }

    @Get('domain')
    getDomain(): string {
        return this.consoService.getDomain();
    }

}
