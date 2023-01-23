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
      .select('domain.name')
      .addSelect(
        'SUM(record.bytes * 1_000_000_000 * domain.co2PerGO)',
        'totalCo2',
      )
      .leftJoin('record.domain', 'domain')
      .groupBy('domain.name')
      .orderBy('SUM(record.bytes * 1_000_000_000 * domain.co2PerGO)', 'DESC')
      .limit(number)
      .getRawMany();

    return requete;
  }

  async getWeekStat() {
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.domain', 'domain')
      .getMany();

    // partie qui rempli un objet avec les libelles des jours et la somme des consommations
    const daysInWeek = {};

    const options = { weekday: 'long' } as const;

    requete.forEach((element) => {
      const date = new Date(element.timeInterval * 1000);
      const index = `${new Intl.DateTimeFormat('en-US', options).format(date)}`;
      daysInWeek[index] =
        daysInWeek[index] == undefined
          ? element.bytes * 1_000_000_000 * element.domain.co2PerGO
          : daysInWeek[index] +
            element.bytes * 1_000_000_000 * element.domain.co2PerGO;
    });

    return daysInWeek;
  }

  async getHourStat() {
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.domain', 'domain')
      .getMany();

    // partie qui rempli un objet avec les heures d'une journée et la somme des consommations
    const hourInDays = {};

    requete.forEach((element) => {
      const date = new Date(element.timeInterval * 1000);
      const index = `${('0' + date.getHours()).slice(-2)}`;
      hourInDays[index] =
        hourInDays[index] == undefined
          ? element.bytes * 1_000_000_000 * element.domain.co2PerGO
          : hourInDays[index] +
            element.bytes * 1_000_000_000 * element.domain.co2PerGO;
    });

    return hourInDays;
  }
}
