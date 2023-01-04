import { Body, Controller, Post } from '@nestjs/common';

import { CreateRecordDto } from './dto/create-record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }
}
