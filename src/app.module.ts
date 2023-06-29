import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './typeorm.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true
      }),
      TypeOrmModule.forRoot(typeormConfig),
      EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}