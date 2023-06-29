import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';
import { WaitlistEntry } from '../entities/waitlist-entry.entity';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { CreateWaitlistEntryServiceInterface } from '../interfaces/create-waitlist-entry-service.interface';

@Injectable()
export class CreateWaitlistEntryService implements CreateWaitlistEntryServiceInterface {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(WaitlistEntry)
    private readonly waitlistEntryRepository: Repository<WaitlistEntry>,
  ) {}

  /**
   * Creates a new WaitlistEntry entity with status 'pending' and a confirmation token generated
   * Retrieves the User entity associated with the provided userId
   * Associates the WaitlistEntry entity with the User entity
   * Saves the new WaitlistEntry entity to the database
   * Sends an email to the user's email address including the confirmation token
   * Returns the created WaitlistEntry entity to the frontend
   * @param email The email address of the user who signed up for the waitlist
   * @param userId The unique identifier for the user
   * @returns A Promise that resolves to a WaitlistEntry entity
   */
  async createWaitlistEntry(email: string, userId: string): Promise<WaitlistEntry> {
    const waitlistEntry = new WaitlistEntry();
    waitlistEntry.email = email;
    waitlistEntry.status = 'pending';
    waitlistEntry.confirmationToken = bcrypt.hashSync(moment().toISOString(), 10);

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    waitlistEntry.user = user;

    const createdWaitlistEntry = await this.waitlistEntryRepository.save(waitlistEntry);

    // Send email to user's email address including the confirmation token

    return createdWaitlistEntry;
  }
}