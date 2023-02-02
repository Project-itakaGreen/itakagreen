import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

import { AuthService } from '../auth.service';

// check if user is valide for each endpoint
@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, user: User | null) => null | User,
  ) {
    done(null, user);
  }

  async deserializeUser(
    payload: any,
    done: (err: Error | null, user: User | null) => null | User,
  ) {
    const user = await this.authService.findUserById(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
