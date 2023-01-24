import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { GoogleAuthGuard } from 'src/auth/utils/guards';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()

  getHello(): string {
    return this.appService.getHello();
  }
   // route des logs
   // TODO secure logs from user 
   @UseGuards(JwtAuthGuard)
   @Get('logs')
   getLogs(): string {
     return this.appService.getLogs();
   }
}
