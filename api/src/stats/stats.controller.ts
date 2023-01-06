import { Controller, Get, Param } from '@nestjs/common';

import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
    constructor (private readonly statsService: StatsService){}

    @Get('domain/:number?')
    getDomain(@Param('number') number: number)
    {
        return this.statsService.getDomain(number);
    }

    @Get('hourStat')
    getHourStat()
    {
        return this.statsService.getHourStat();
    }

    @Get('daysStat')
    getDaysStat()
    {
        return this.statsService.getDaysStat();
    }
}   
