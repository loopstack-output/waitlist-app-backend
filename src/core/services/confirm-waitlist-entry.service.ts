import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import { User } from '../entities/user.entity';
import { EmailService } from './email.service';

@Injectable()
export class ConfirmWaitlistEntryService {
  constructor(
    @InjectRepository(WaitlistEntry)
    private readonly waitlistEntryRepository: Repository<WaitlistEntry>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  /**
   * Retrieves a WaitlistEntry entity from the database by a given confirmation token, updates its status to 'confirmed', saves the updated entity to the database, sends a confirmation email to the user, and returns the updated WaitlistEntry entity
   * @param confirmationToken A string representing the confirmation token of the WaitlistEntry entity to be confirmed
   * @returns A Promise that resolves to a WaitlistEntry entity
   * @throws An error if the WaitlistEntry entity with the given confirmation token does not exist
   */
  async confirmWaitlistEntry(confirmationToken: string): Promise<WaitlistEntry> {
    // Retrieve the waitlist entry with the given confirmation token from the database
    const waitlistEntry = await this.waitlistEntryRepository.findOne({ where: { confirmationToken } });

    // Throw an error if the waitlist entry does not exist
    if (!waitlistEntry) {
      throw new Error('Waitlist entry not found');
    }

    // Update the status of the waitlist entry to 'confirmed'
    waitlistEntry.status = 'confirmed';

    // Save the updated waitlist entry to the database
    const updatedWaitlistEntry = await this.waitlistEntryRepository.save(waitlistEntry);

    // Send a second email to the recipient confirming the waitlist entry
    const user = await this.userRepository.findOne({ where: { id: updatedWaitlistEntry.user.id } });
    await this.emailService.sendConfirmationEmail(user.email, updatedWaitlistEntry);

    // Return the updated waitlist entry to the frontend
    return updatedWaitlistEntry;
  }
}