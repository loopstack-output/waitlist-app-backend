import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import AuthModule from './auth/auth.module';
import UserModule from './user/user.module';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      TypeOrmModule.forRoot(typeormConfig),
      EventEmitterModule.forRoot(),
      AuthModule,
      UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}