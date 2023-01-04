import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Domain } from './../domain/entities/domain.entity';

@Injectable()
export class DomainService {
  constructor(
    @InjectRepository(Domain)
    private readonly domainRepository: Repository<Domain>,
  ) {}

  async getOrCreate(domainId) {
    let domain = await this.domainRepository.findOne({
      where: {
        id: domainId,
      },
    });
    if (!domain) {
      domain = new Domain();
      domain.name = domainId;
      domain.co2PerBytes = 32; // TODO call the api to get the true value
      domain = await this.domainRepository.save(domain);
    }
    return domain;
  }
}
