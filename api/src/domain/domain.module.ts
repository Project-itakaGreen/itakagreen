import { Module } from '@nestjs/common';

import { DomainService } from './domain.service';

@Module({
  controllers: [],
  providers: [DomainService],
})
export class DomainModule {}
