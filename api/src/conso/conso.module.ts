import { Module } from '@nestjs/common';

import { ConsoService } from './conso.service';

import { ConsoController } from './conso.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Record } from 'src/record/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [ConsoController],
  providers: [ConsoService],
})
export class ConsoModule {}
