import { WaitlistEntry } from '../entities/waitlist-entry.entity';

export interface ConfirmWaitlistEntryServiceInterface {
  confirmWaitlistEntry(confirmationToken: string): Promise<WaitlistEntry>;
}