import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';

@Injectable()
export class RemoveWaitlistEntryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(WaitlistEntry)
    private readonly waitlistEntryRepository: Repository<WaitlistEntry>,
  ) {}

  /**
   * Removes a waitlist entry from the database
   * @param email The email address of the waitlist entry to be removed
   * @param userId The id of the authenticated user who created the waitlist entry
   * @returns A Promise that resolves to the id of the deleted waitlist entry
   * @throws An error if the waitlist entry does not exist or the authenticated user did not create the waitlist entry
   */
  async removeWaitlistEntry(
    email: string,
    userId: string,
  ): Promise<string> {
    // Retrieve the waitlist entry with the given email address from the database
    const waitlistEntry = await this.waitlistEntryRepository.findOne({
      where: { email },
      relations: ['user'],
    });

    // Throw an error if the waitlist entry does not exist
    if (!waitlistEntry) {
      throw new Error('Waitlist entry not found');
    }

    // Validate that the authenticated user created the waitlist entry with the given email address
    if (waitlistEntry.user.id !== userId) {
      throw new Error('User is not authorized to remove this waitlist entry');
    }

    // Delete the waitlist entry from the database
    await this.waitlistEntryRepository.remove(waitlistEntry);

    // Return the id of the deleted waitlist entry to the frontend
    return waitlistEntry.id;
  }
}