import { Injectable } from '@nestjs/common';

import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  create(createRecordDto: CreateRecordDto) {
    return 'This action adds a new record';
  }

  findAll() {
    return `This action returns all record`;
  }

  findOne(id: number) {
    return `This action returns a #${id} record`;
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
