import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { DomainModule } from './../domain/domain.module';
import { RecordModule } from './../record/record.module';
import { UserModule } from './../user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true, // TODO remove this line in production
    }),
    RecordModule,
    DomainModule,
    UserModule,
    AuthModule,
    PassportModule.register({ session: true })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private DataSouce: DataSource) {}
}
