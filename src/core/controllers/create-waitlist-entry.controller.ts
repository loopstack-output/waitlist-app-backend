import { Controller, Post, Body } from '@nestjs/common';
import { CreateWaitlistEntryService } from '../services/create-waitlist-entry.service';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';

@Controller()
export class CreateWaitlistEntryController {
  constructor(private readonly createWaitlistEntryService: CreateWaitlistEntryService) {}

  /**
   * Creates a new waitlist entry with status 'pending' and sends an email to the user's email address including the confirmation token
   * @param email The user's email address
   * @param userId The user's id
   * @returns A Promise that resolves to the created waitlist entry
   */
  @Post('/api/waitlist-entries')
  async createWaitlistEntry(
    @Body('email') email: string,
    @Body('userId') userId: string,
  ): Promise<WaitlistEntry> {
    // Validate input
    if (!email || !userId) {
      throw new Error('Email and userId are required');
    }

    // Call service method
    const waitlistEntry = await this.createWaitlistEntryService.createWaitlistEntry(email, userId);

    // Return the created waitlist entry to the frontend
    return waitlistEntry;
  }
}