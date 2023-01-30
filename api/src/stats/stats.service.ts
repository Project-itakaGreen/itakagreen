import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/record/entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatsService {
  private readonly logger: Logger = new Logger(StatsService.name);

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async getDomain(number: number) {
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .select('domain.name', 'domain')
      .addSelect(
        'SUM(record.bytes * domain.co2PerGO / 1073741824)::numeric',
        'co2',
      )
      .leftJoin('record.domain', 'domain')
      .groupBy('domain.name')
      .orderBy(
        'SUM(record.bytes * domain.co2PerGO / 1073741824)::numeric',
        'DESC',
      )
      .limit(number)
      .getRawMany();

    return requete;
  }

  async getWeekStat() {
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.domain', 'domain')
      .getMany();

    const daysInWeek = {
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
      Sunday: 0,
    };
    const options = { weekday: 'long' } as const;
    requete.forEach((element) => {
      const date = new Date(element.timeInterval * 1000);
      const index = `${new Intl.DateTimeFormat('en-US', options).format(date)}`;
      daysInWeek[index] =
        daysInWeek[index] == undefined
          ? (element.bytes * element.domain.co2PerGO) / 1073741824
          : daysInWeek[index] +
            (element.bytes * element.domain.co2PerGO) / 1073741824;
    });
    const reformatDaysInWeek = Object.entries(daysInWeek).map((el) => {
      return {
        day: el[0],
        co2: el[1],
      };
    });
    return reformatDaysInWeek;
  }

  // partie qui rempli un objet avec les heures d'une journée et la somme des consommations
  async getHourStat() {
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.domain', 'domain')
      .getMany();
    const hourInDays = {
      '00': 0,
      '01': 0,
      '02': 0,
      '03': 0,
      '04': 0,
      '05': 0,
      '06': 0,
      '07': 0,
      '08': 0,
      '09': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0,
      '15': 0,
      '16': 0,
      '17': 0,
      '18': 0,
      '19': 0,
      '20': 0,
      '21': 0,
      '22': 0,
      '23': 0,
    };

    requete.forEach((element) => {
      const date = new Date(element.timeInterval * 1000);
      const index = `${('0' + date.getHours()).slice(-2)}`;
      hourInDays[index] =
        hourInDays[index] == undefined
          ? (element.bytes * element.domain.co2PerGO) / 1073741824
          : hourInDays[index] +
            (element.bytes * element.domain.co2PerGO) / 1073741824;
    });

    const dataHourInDays = Object.entries(hourInDays)
      .map((el) => {
        return {
          hour: el[0],
          co2: el[1],
        };
      })
      .sort((a, b) => a.hour.localeCompare(b.hour));

    return dataHourInDays;
  }
}
