import { Controller, Get, UseGuards, Request, Inject, Response} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  handleLogin(): any {
    return { msg: 'Google Authentication' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }
}
