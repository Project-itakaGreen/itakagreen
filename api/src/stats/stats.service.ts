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

    async getDomain(number: number)
    {
        let requete = await this.recordRepository
        .createQueryBuilder("record")
        .select('domain.name')
        .addSelect('SUM(record.bytes * domain.co2PerBytes)',"totalCo2")
        .leftJoin('record.domain', 'domain')
        .groupBy('domain.name')
        .orderBy("SUM(record.bytes * domain.co2PerBytes)", "DESC")
        .limit(number)
        .getRawMany();

        return requete;
    }

    async getWeekStat()
    {
        let requete = await this.recordRepository
        .createQueryBuilder('record')
        .leftJoinAndSelect('record.domain', 'domain')
        .getMany()
        

        // partie qui rempli un objet avec les libelles des jours et la somme des consommations
        var daysInWeek = {};

        var options = { weekday: 'long'} as const;

        requete.forEach(element => {
            let date = new Date( element.timeIntervale * 1000);
            let index = `${new Intl.DateTimeFormat('en-US', options).format(date)}`;
            daysInWeek[index] = (daysInWeek[index] == undefined) ? (element.bytes * element.domain.co2PerBytes) :  daysInWeek[index]+(element.bytes * element.domain.co2PerBytes);
        });

        return daysInWeek;
    }

    async getHourStat()
    {
        let requete = await this.recordRepository
        .createQueryBuilder('record')
        .leftJoinAndSelect('record.domain', 'domain')
        .getMany()
        

        // partie qui rempli un objet avec les heures d'une journée et la somme des consommations
        var hourInDays = {};

        requete.forEach(element => {
            let date = new Date( element.timeIntervale * 1000);
            let index = `${('0'+date.getHours()).slice(-2)}`;
            hourInDays[index] = (hourInDays[index] == undefined) ? (element.bytes * element.domain.co2PerBytes) :  hourInDays[index]+(element.bytes * element.domain.co2PerBytes);
        });

        return hourInDays;
    }
    
}
