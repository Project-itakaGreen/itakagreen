import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Domain } from './../domain/entities/domain.entity';
import { User } from './../user/entities/user.entity';
import { Record } from './entities/record.entity';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record]),
    TypeOrmModule.forFeature([Domain]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
