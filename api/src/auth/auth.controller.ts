import { Controller, Get, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';

@Controller('auth')
export class AuthController {

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin(): any {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' }
  }
}