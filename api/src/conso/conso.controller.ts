import { Controller, Get } from '@nestjs/common';

import { ConsoService } from './conso.service';

import { Param } from '@nestjs/common';

@Controller('conso')
export class ConsoController {

    constructor(private readonly consoService: ConsoService) {}

    @Get('total/:number?')
    getTotal(@Param('number') number: number) {
        return this.consoService.getTotal(number??1);
      }

    @Get('day/:number?')
    getDay(@Param('number') number: number) {
        return this.consoService.getDay(number??7);
      }

    @Get('domain/:number?')
    getDomain(@Param('number') number: number) {
        return this.consoService.getDomain(number??1);
      }

}
