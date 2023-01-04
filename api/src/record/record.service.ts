import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DomainService } from './../domain/domain.service';
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
    private readonly domainService: DomainService,
  ) {}

  async create(createRecordDto: CreateRecordDto) {
    const domain = await this.domainService.getOrCreate(
      createRecordDto.domainName,
    );

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
