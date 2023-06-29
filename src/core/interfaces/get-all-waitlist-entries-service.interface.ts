import { WaitlistEntry } from '../entities/waitlist-entry.entity';

export interface GetAllWaitlistEntriesServiceInterface {
  getAllWaitlistEntries(userId: string): Promise<WaitlistEntry[]>;
}