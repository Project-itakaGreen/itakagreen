import { Controller, Get, Param } from '@nestjs/common';

import { StatsService } from './stats.service';

const DEFAULT_NUMBER_DOMAIN = 5;

@Controller('stats')
export class StatsController {
    constructor (private readonly statsService: StatsService){}

    @Get('domain/:number?')
    getDomain( @Param('number') number: number)
    {
        return this.statsService.getDomain(number??DEFAULT_NUMBER_DOMAIN);
    }

    @Get('hourStat')
    getHourStat()
    {
        return this.statsService.getHourStat();
    }

    @Get('weekStat')
    getWeekStat()
    {
        return this.statsService.getWeekStat();
    }
}   
