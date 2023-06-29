import { WaitlistEntry } from '../entities/waitlist-entry.entity';

export interface CreateWaitlistEntryServiceInterface {
  createWaitlistEntry(email: string, userId: string): Promise<WaitlistEntry>;
}