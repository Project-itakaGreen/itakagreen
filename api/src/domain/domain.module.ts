import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain } from '../domain/entities/domain.entity';
import { DomainService } from './domain.service';

@Module({
  imports: [TypeOrmModule.forFeature([Domain]), HttpModule],
  controllers: [],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
