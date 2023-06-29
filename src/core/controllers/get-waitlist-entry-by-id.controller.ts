import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { GetWaitlistEntryByIdService } from '../services/get-waitlist-entry-by-id.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';

@Controller('api/waitlist-entries')
export class GetWaitlistEntryByIdController {
  constructor(private readonly getWaitlistEntryByIdService: GetWaitlistEntryByIdService) {}

  /**
   * Returns a waitlist entry with a specific id
   * @param waitlist_entry_id The id of the waitlist entry to retrieve
   * @param req - The request object containing the authenticated userDTO object
   * @returns A Promise that resolves to the waitlist entry with the specified id
   */
  @Get(':waitlist_entry_id')
  @UseGuards(JwtAuthGuard)
  async getWaitlistEntryById(
    @Param('waitlist_entry_id') waitlist_entry_id: string,
    @Request() req,
  ): Promise<WaitlistEntry> {
    // Call service method
    const waitlistEntry = await this.getWaitlistEntryByIdService.getWaitlistEntryById(waitlist_entry_id, req.user.id);

    // Return the waitlist entry
    return waitlistEntry;
  }
}