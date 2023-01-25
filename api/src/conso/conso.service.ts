import { Injectable, Logger } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Record } from 'src/record/entities/record.entity'; 

@Injectable()
export class ConsoService {
    private readonly logger: Logger = new Logger(ConsoService.name);

    constructor(
        @InjectRepository(Record)
        private readonly recordRepository: Repository<Record>
    ){}

    async getTotal(period: number) {

        let idUser = 1; // TODO get current user

        let timestamp = this.getTimestampFromPeriod(period);
        
        let total = await this.recordRepository
        .createQueryBuilder("record")
        .select('record.userId')
        .addSelect('SUM(record.gigaOctets * domain.co2PerGO)',"totalCo2")
        .leftJoin('record.domain', 'domain')
        .where('record.userId = :userId', {userId: idUser})
        .andWhere('record.timeInterval > :parameter', {parameter: timestamp})
        .groupBy('record.userId')
        .getRawOne();

        return total ?? { userId: idUser, totalCo2: "0" };
    }

    async getDay(period: number) {

        let idUser = 1; // TODO get current user

        let interval = this.getTimestampFromPeriod(period);

        let requete = await this.recordRepository
        .createQueryBuilder('record')
        .leftJoinAndSelect('record.domain', 'domain')
        .where('record.userId = :userId', {userId: idUser})
        .andWhere('record.timeInterval > :oneWeek', {oneWeek: interval})
        .orderBy('record.timeInterval')
        .getMany()
        

        // partie qui rempli un objet avec la date et la somme des consommations
        let lastWeek = {};

        requete.forEach(element => {
            let date = new Date( element.timeInterval * 1000);
            let index = `${('0'+date.getDate()).slice(-2)}/${('0'+date.getMonth()+1).slice(-2)}/${date.getFullYear()}`;
            lastWeek[index] = (lastWeek[index] == undefined) ? (element.gigaOctets * element.domain.co2PerGO) :  lastWeek[index]+(element.gigaOctets * element.domain.co2PerGO);
        });
        
        lastWeek = Object.entries(lastWeek).map((e)=>{
            return {
                "date": e[0],
                "co2": e[1]
            }
        })
        return lastWeek;

    }

   async getDomain(period: number) {

        let idUser = 1; // TODO get current user

        let timestamp = this.getTimestampFromPeriod(period);

        let requete = await this.recordRepository
        .createQueryBuilder("record")
        .select('domain.name', "domain")
        .addSelect('SUM(record.gigaOctets * domain.co2PerGO)',"co2")
        .leftJoin('record.domain', 'domain')
        .where('record.userId = :userId', {userId: idUser})
        .andWhere('record.timeInterval > :parameter', {parameter: timestamp})
        .groupBy('domain.name')
        .getRawMany();

        return requete;
    }

    getTimestampFromPeriod(period: number)
    {
        // partie qui récupere le timestamp de la date du jour - x jour 
        let date = new Date();

        let day = date.getDate();
    
        let month = date.getMonth();
    
        let year = date.getFullYear();

        let today = new Date(year,month,day,0,0,0);
        
        let todayTimestamp = today.getTime()/1000;

        let todayMinusPeriod = todayTimestamp - (3600*24*(period-1));

        return todayMinusPeriod;
        // fin partie -- à sortir afin d'être utiliser et paramétrable
    }

}
