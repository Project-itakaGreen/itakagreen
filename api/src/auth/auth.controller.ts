import {
  Controller,
  Get,
  UseGuards,
  Request,
  Inject,
  Response,
} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private config: ConfigService,
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin(): any {
    return { msg: 'Google Authentication' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async handleRedirect(@Request() req, @Response() res) {
    const accessToken = await this.authService.login(req.user);
    res.cookie('auth2', accessToken.access_token, {
      maxAge: Number(accessToken.token_expire.slice(0, -1)) * 1000,
      httpOnly: true,
      domain: this.config.get('COOKIE_DOMAIN'),
      path: '/',
      sameSite: 'lax',
    });
    res.redirect(this.config.get('FRONT_URL'));
  }
}
