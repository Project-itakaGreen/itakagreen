import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordService } from './record.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('single/:userId')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createRecordDto: CreateRecordDto,
    @Param('userId') userId: number,
  ) {
    return this.recordService.create(createRecordDto, userId);
  }

  @Post('many/:userId')
  @UseGuards(JwtAuthGuard)
  createMany(
    @Body() createRecordDto: CreateRecordDto[],
    @Param('userId') userId: number,
  ) {
    return this.recordService.createMany(createRecordDto, userId);
  }
}
