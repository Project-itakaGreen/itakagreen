import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Record } from 'src/record/entities/record.entity'; 

@Injectable()
export class StatsService {

    constructor (
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>
    ){}

    async getDomain(nbDomain :number)
    {
        return `envoi des ${nbDomain} domaines les plus polluants`;
    }

    async getDaysStat()
    {
        return `envoi des jours de la semaine les plus polluants`;
    }

    async getHourStat()
    {
        return `envoi des heures du jour les plus polluants`;
    }
    
}
