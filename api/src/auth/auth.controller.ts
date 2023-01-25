import { Controller, Get, UseGuards, Request, Inject, Response} from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService,) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  handleLogin(): any {
    return { msg: 'Google Authentication' };
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async handleRedirect(@Request() req, @Response() res) {
    let accessToken = await this.authService.login(req.user);
    console.log(accessToken.token_expire.slice(0, -1));
    res.cookie('auth2', accessToken.access_token, {maxAge: Number(accessToken.token_expire.slice(0, -1)) * 1000, httpOnly: true});
    res.redirect('/api');
  }
}