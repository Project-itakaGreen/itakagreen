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
        .addSelect('SUM(record.gigaOctets * domain.co2PerGO)',"totalCo2")
        .leftJoin('record.domain', 'domain')
        .groupBy('domain.name')
        .orderBy("SUM(record.gigaOctets * domain.co2PerGO)", "DESC")
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
            let date = new Date( element.timeInterval * 1000);
            let index = `${new Intl.DateTimeFormat('en-US', options).format(date)}`;
            daysInWeek[index] = (daysInWeek[index] == undefined) ? (element.gigaOctets * element.domain.co2PerGO) :  daysInWeek[index]+(element.gigaOctets * element.domain.co2PerGO);
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
            let date = new Date( element.timeInterval * 1000);
            let index = `${('0'+date.getHours()).slice(-2)}`;
            hourInDays[index] = (hourInDays[index] == undefined) ? (element.gigaOctets * element.domain.co2PerGO) :  hourInDays[index]+(element.gigaOctets * element.domain.co2PerGO);
        });

        return hourInDays;
    }
    
}
