import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class GetWaitlistEntryByIdService {
  constructor(
    @InjectRepository(WaitlistEntry)
    private readonly waitlistEntryRepository: Repository<WaitlistEntry>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getWaitlistEntryById(id: string, userId?: string): Promise<WaitlistEntry> {
    // Retrieve the waitlist entry with the given id from the database
    const waitlistEntry = await this.waitlistEntryRepository.findOne({ where: { id } });

    // Throw an error if the waitlist entry does not exist
    if (!waitlistEntry) {
      throw new NotFoundException('Waitlist entry not found');
    }

    // Validate that the authenticated user created the waitlist entry with the given id, if userId is provided
    if (userId && waitlistEntry.user.id !== userId) {
      throw new ForbiddenException('User does not have permission to access this waitlist entry');
    }

    // Return the waitlist entry to the controller
    return waitlistEntry;
  }
}