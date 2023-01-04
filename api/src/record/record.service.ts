import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Domain } from './../domain/entities/domain.entity';
import { User } from './../user/entities/user.entity';
import { CreateRecordDto } from './dto/create-record.dto';
import { Record } from './entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    let domain = await this.domainRepository.findOne({
      where: {
        name: createRecordDto.domainName,
      },
    });
    if (!domain) {
      domain = new Domain();
      domain.name = createRecordDto.domainName;
      domain.co2PerBytes = 32; // TODO call the api to get the true value
      domain = await this.domainRepository.save(domain);
    }

    let user = await this.userRepository.findOne({
      where: {
        id: createRecordDto.userId,
      },
    });

    if (!user) {
      user = new User();
      user.email = 'test@test.test';
      user = await this.userRepository.save(user);
    }

    const record = new Record();
    record.domain = domain;
    record.bytes = createRecordDto.bytes;
    record.timeInterval = createRecordDto.timeInterval;
    record.user = user;

    return this.recordRepository.save(record);
  }
}
