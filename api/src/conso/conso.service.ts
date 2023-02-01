import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from 'src/record/entities/record.entity';
import { Repository } from 'typeorm';

import { User } from './../user/entities/user.entity';

@Injectable()
export class ConsoService {
  private readonly logger: Logger = new Logger(ConsoService.name);

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
  ) {}

  async getTotal(user: User, period: number) {
    const timestamp = this.getTimestampFromPeriod(period);

    const total = await this.recordRepository
      .createQueryBuilder('record')
      .select('record.userId')
      .addSelect(
        'SUM(record.bytes * domain.co2PerGO / 1073741824)::numeric',
        'totalCo2',
      )
      .leftJoin('record.domain', 'domain')
      .where('record.userId = :userId', { userId: user.id })
      .andWhere('record.timeInterval > :parameter', { parameter: timestamp })
      .groupBy('record.userId')
      .getRawOne();
    return total ?? { userId: user.id, totalCo2: '0' };
  }

  async getDay(user: User, period: number) {
    const interval = this.getTimestampFromPeriod(period);
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .leftJoinAndSelect('record.domain', 'domain')
      .where('record.userId = :userId', { userId: user.id })
      .andWhere('record.timeInterval > :oneWeek', { oneWeek: interval })
      .orderBy('record.timeInterval')
      .getMany();
    // partie qui rempli un objet avec la date et la somme des consommations
    const lastWeek = [];
    requete.forEach((element) => {
      const date = new Date(element.timeInterval * 1000);
      const index = `${('0' + date.getDate()).slice(-2)}/${(
        '0' +
        date.getMonth() +
        1
      ).slice(-2)}/${date.getFullYear()}`;
      lastWeek[index] =
        lastWeek[index] == undefined
          ? (element.bytes * element.domain.co2PerGO) / 1073741824
          : lastWeek[index] +
            (element.bytes * element.domain.co2PerGO) / 1073741824;
    });
    const reformatLastWeek = Object.entries(lastWeek).map((e) => {
      return {
        date: e[0],
        co2: e[1],
      };
    });
    return reformatLastWeek;
  }

  async getDomain(user: User, period: number) {
    const timestamp = this.getTimestampFromPeriod(period);
    const requete = await this.recordRepository
      .createQueryBuilder('record')
      .select('domain.name', 'domain')
      .addSelect(
        'SUM(record.bytes * domain.co2PerGO / 1073741824)::numeric',
        'co2',
      )
      .leftJoin('record.domain', 'domain')
      .where('record.userId = :userId', { userId: user.id })
      .andWhere('record.timeInterval > :parameter', { parameter: timestamp })
      .groupBy('domain.name')
      .getRawMany();

    return requete;
  }

  getTimestampFromPeriod(period: number) {
    // partie qui récupere le timestamp de la date du jour - x jour
    const date = new Date();

    const day = date.getDate();

    const month = date.getMonth();

    const year = date.getFullYear();

    const today = new Date(year, month, day, 0, 0, 0);

    const todayTimestamp = today.getTime() / 1000;

    const todayMinusPeriod = todayTimestamp - 3600 * 24 * (period - 1);

    return todayMinusPeriod;
    // fin partie -- à sortir afin d'être utiliser et paramétrable
  }
}
