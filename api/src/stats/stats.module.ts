import { Module } from '@nestjs/common';

import { StatsService } from './stats.service';

import { StatsController } from './stats.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Record } from 'src/record/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
