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
import { CreateWaitlistEntryController } from './controllers/create-waitlist-entry.controller';
import { ConfirmWaitlistEntryController } from './controllers/confirm-waitlist-entry.controller';
import { RemoveWaitlistEntryController } from './controllers/remove-waitlist-entry.controller';
import { GetWaitlistEntryByIdController } from './controllers/get-waitlist-entry-by-id.controller';
import { GetAllWaitlistEntriesController } from './controllers/get-all-waitlist-entries.controller';

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
  controllers: [
    CreateWaitlistEntryController,
    ConfirmWaitlistEntryController,
    RemoveWaitlistEntryController,
    GetWaitlistEntryByIdController,
    GetAllWaitlistEntriesController,
  ],
})
export class CoreModule {}