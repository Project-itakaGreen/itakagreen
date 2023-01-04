import { Module } from '@nestjs/common';

import { ConsoService } from './conso.service';

import { ConsoController } from './conso.controller';

@Module({
  controllers: [ConsoController],
  providers: [ConsoService],
})
export class ConsoModule {}
