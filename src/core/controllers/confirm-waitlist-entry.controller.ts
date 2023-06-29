import { Controller, Post, Body, HttpCode, Param, UseGuards } from '@nestjs/common';
import { ConfirmWaitlistEntryService } from '../services/confirm-waitlist-entry.service';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/waitlist-entries')
export class ConfirmWaitlistEntryController {
  constructor(private readonly confirmWaitlistEntryService: ConfirmWaitlistEntryService) {}

  /**
   * Confirms the waitlist entry with the given confirmation token and sends a second email to the recipient confirming the waitlist entry
   * @param confirmationToken The confirmation token of the waitlist entry to confirm
   * @returns A Promise that resolves to the updated waitlist entry
   */
  @Post('confirm/:confirmation_token')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async confirmWaitlistEntry(@Param('confirmation_token') confirmationToken: string): Promise<WaitlistEntry> {
    // Call service method
    const waitlistEntry = await this.confirmWaitlistEntryService.confirmWaitlistEntry(confirmationToken);

    // Return the updated waitlist entry
    return waitlistEntry;
  }
}