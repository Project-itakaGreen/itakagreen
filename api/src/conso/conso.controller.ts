import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { ConsoService } from './conso.service';

const DEFAULT_DAYS_PERIOD = 7;

const DEFAULT_TOTAL_PERIOD = 1;

const DEFAULT_DOMAIN_PERIOD = 1;

@Controller('conso')
export class ConsoController {
  constructor(private readonly consoService: ConsoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('total/:period?')
  getTotal(
    @Param('period') period: number,
    @Request() req
  ) {
    return this.consoService.getTotal(req.user, period ?? DEFAULT_TOTAL_PERIOD);
  }

  @UseGuards(JwtAuthGuard)
  @Get('day/:period?')
  getDay(
    @Param('period') period: number,
    @Request() req
  ) {
    return this.consoService.getDay(req.user, period ?? DEFAULT_DAYS_PERIOD);
  }

  @UseGuards(JwtAuthGuard)
  @Get('domain/:period?')
  getDomain(
    @Param('period') period: number,
    @Request() req
  ) {
    return this.consoService.getDomain(req.user, period ?? DEFAULT_DOMAIN_PERIOD);
  }
}
