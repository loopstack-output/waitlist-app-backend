import { WaitlistEntry } from '../entities/waitlist-entry.entity';

export interface GetWaitlistEntryByIdServiceInterface {
  getWaitlistEntryById(id: string, userId?: string): Promise<WaitlistEntry>;
}