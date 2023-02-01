import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

import { CreateRecordDto } from './dto/create-record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @UseGuards(JwtAuthGuard)
  @Post('single')
  create(@Body() createRecordDto: CreateRecordDto, @Request() req) {
    const userId = req.user.id;
    return this.recordService.create(createRecordDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('many')
  createMany(@Body() createRecordDto: CreateRecordDto[], @Request() req) {
    const userId = req.user.id;
    return this.recordService.createMany(createRecordDto, userId);
  }
}
