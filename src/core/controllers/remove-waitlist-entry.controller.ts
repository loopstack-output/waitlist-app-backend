import { Controller, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { RemoveWaitlistEntryService } from '../services/remove-waitlist-entry.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('api/waitlist-entries')
export class RemoveWaitlistEntryController {
  constructor(private readonly removeWaitlistEntryService: RemoveWaitlistEntryService) {}

  @Delete(':email')
  @UseGuards(JwtAuthGuard)
  async removeWaitlistEntry(@Param('email') email: string, @Request() req): Promise<string> {
    const id = await this.removeWaitlistEntryService.removeWaitlistEntry(email, req.user.id);
    return id;
  }
}