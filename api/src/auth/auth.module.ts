import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/googleStrategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { SessionSerializer } from './utils/serializer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ])
  ],
  controllers: [AuthController],
  providers: [
    GoogleStrategy, 
    SessionSerializer,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService,
    }
  ],
})
export class AuthModule {}
