export interface RemoveWaitlistEntryServiceInterface {
  removeWaitlistEntry(email: string, userId: string): Promise<string>;
}