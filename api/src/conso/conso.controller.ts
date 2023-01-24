import { Controller, Get, UseGuards } from '@nestjs/common';
import { ConsoService } from './conso.service';
import { Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

const DEFAULT_DAYS_PERIOD = 7;

const DEFAULT_TOTAL_PERIOD = 1;

const DEFAULT_DOMAIN_PERIOD  = 1;

@Controller('conso')
export class ConsoController {

    constructor(private readonly consoService: ConsoService) {}

    @Get('total/:period?')
    @UseGuards(JwtAuthGuard)
    getTotal(@Param('period') period: number) {
        return this.consoService.getTotal( period ?? DEFAULT_TOTAL_PERIOD );
      }

    @Get('day/:period?')
    @UseGuards(JwtAuthGuard)
    getDay(@Param('period') period: number) {
        return this.consoService.getDay( period ?? DEFAULT_DAYS_PERIOD );
      }

    @Get('domain/:period?')
    @UseGuards(JwtAuthGuard)
    getDomain(@Param('period') period: number) {
        return this.consoService.getDomain( period ?? DEFAULT_DOMAIN_PERIOD );
      }

}
