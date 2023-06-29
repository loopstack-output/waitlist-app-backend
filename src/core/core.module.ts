import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from './entities/user.entity';
import { WaitlistEntry } from './entities/waitlist-entry.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, WaitlistEntry]),
  ],
})
export class CoreModule {}