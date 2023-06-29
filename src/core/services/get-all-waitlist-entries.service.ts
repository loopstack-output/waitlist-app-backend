import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import { GetAllWaitlistEntriesServiceInterface } from '../interfaces/get-all-waitlist-entries-service.interface';

@Injectable()
export class GetAllWaitlistEntriesService implements GetAllWaitlistEntriesServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(WaitlistEntry)
    private readonly waitlistEntryRepository: Repository<WaitlistEntry>,
  ) {}

  /**
   * Retrieves all waitlist entries from the database created by the authenticated user
   * @param userId The id of the authenticated user
   * @returns A Promise that resolves to an array of WaitlistEntry entities
   */
  async getAllWaitlistEntries(userId: string): Promise<WaitlistEntry[]> {
    // Find the user by the given userId
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Find all waitlist entries created by the user
    const waitlistEntries = await this.waitlistEntryRepository.find({
      where: {
        user,
      },
    });

    return waitlistEntries;
  }
}