import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DomainService } from './../domain/domain.service';
import { User } from './../user/entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  private readonly logger: Logger = new Logger(RecordService.name);

  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly domainService: DomainService,
  ) {}

  async create(createRecordDto: CreateRecordDto, user: User) {
    const domain = await this.domainService.getOrCreate(
      createRecordDto.domainName,
    );

    const record = new Record();
    record.domain = domain;
    record.bytes = createRecordDto.bytes;
    record.timeInterval = createRecordDto.timeInterval;
    record.user = user;

    return this.recordRepository.save(record);
  }

  async createMany(createRecordDtos: CreateRecordDto[], user: User) {
    const createdRecords = createRecordDtos.map(async (record) => {
      return await this.create(record, user);
    });
    return await Promise.allSettled(createdRecords);
  }
}
