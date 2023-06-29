import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { User } from './entities/user.entity';
import { WaitlistEntry } from './entities/waitlist-entry.entity';
import { CreateWaitlistEntryService } from './services/create-waitlist-entry.service';
import { ConfirmWaitlistEntryService } from './services/confirm-waitlist-entry.service';
import { RemoveWaitlistEntryService } from './services/remove-waitlist-entry.service';
import { GetWaitlistEntryByIdService } from './services/get-waitlist-entry-by-id.service';
import { GetAllWaitlistEntriesService } from './services/get-all-waitlist-entries.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User, WaitlistEntry]),
  ],
  providers: [
    CreateWaitlistEntryService,
    ConfirmWaitlistEntryService,
    RemoveWaitlistEntryService,
    GetWaitlistEntryByIdService,
    GetAllWaitlistEntriesService,
  ],
})
export class CoreModule {}