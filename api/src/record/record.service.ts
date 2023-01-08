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
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly domainService: DomainService,
  ) {}

  async create(createRecordDto: CreateRecordDto, userId: number) {
    const domain = await this.domainService.getOrCreate(
      createRecordDto.domainName,
    );

    let user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    // TODO use authentification
    if (!user) {
      user = new User();
      user.email = 'test@test.test';
      user = await this.userRepository.save(user);
    }

    const record = new Record();
    record.domain = domain;
    record.gigaOctets = createRecordDto.gigaOctets;
    record.timeInterval = createRecordDto.timeInterval;
    record.user = user;

    return this.recordRepository.save(record);
  }

  async createMany(createRecordDtos: CreateRecordDto[], userId: number) {
    const createdRecords = createRecordDtos.map(async (record) => {
      return await this.create(record, userId);
    });
    return await Promise.all(createdRecords);
  }
}
