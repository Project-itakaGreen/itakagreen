import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordService } from './record.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @UseGuards(JwtAuthGuard)
  @Post('single/:userId')
  create(
    @Body() createRecordDto: CreateRecordDto,
    @Param('userId') userId: number,
  ) {
    return this.recordService.create(createRecordDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('many/:userId')
  createMany(
    @Body() createRecordDto: CreateRecordDto[],
    @Param('userId') userId: number,
  ) {
    return this.recordService.createMany(createRecordDto, userId);
  }
}
