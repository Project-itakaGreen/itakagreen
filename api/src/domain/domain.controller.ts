import { Body, Controller, Post } from '@nestjs/common';

import { DomainService } from './domain.service';
import { DomainDto } from './dto/domain.dto';

@Controller()
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post('domain')
  create(@Body() domainDto: DomainDto) {
    return this.domainService.getOrCreate(domainDto.domain);
  }
}
