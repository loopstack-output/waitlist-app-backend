import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import { GetAllWaitlistEntriesService } from '../services/get-all-waitlist-entries.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/waitlist-entries')
export class GetAllWaitlistEntriesController {
  constructor(private readonly getAllWaitlistEntriesService: GetAllWaitlistEntriesService) {}

  /**
   * Returns a list of all waitlist entries
   * @param req - The request object containing the authenticated userDTO object
   * @returns A Promise that resolves to an array of waitlist entries
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllWaitlistEntries(@Request() req): Promise<WaitlistEntry[]> {
    // Call service method
    const waitlistEntries = await this.getAllWaitlistEntriesService.getAllWaitlistEntries(req.user.id);

    // Return the list of waitlist entries to the frontend
    return waitlistEntries;
  }
}