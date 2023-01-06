import { Body, Controller, Param, Post } from '@nestjs/common';

import { CreateRecordDto } from './dto/create-record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('single/:userId')
  create(
    @Body() createRecordDto: CreateRecordDto,
    @Param('userId') userId: number,
  ) {
    return this.recordService.create(createRecordDto, userId);
  }

  @Post('many/:userId')
  createMany(
    @Body() createRecordDto: CreateRecordDto[],
    @Param('userId') userId: number,
  ) {
    return this.recordService.createMany(createRecordDto, userId);
  }
}
