import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { WaitlistEntry } from '../../core/entities/waitlist-entry.entity';

/**
 * Stores user information such as id and waitlist entries
 * A user is created when they sign up for the service
 */
@Entity()
export class User {
  /**
   * The unique identifier for the user
   */
  @PrimaryColumn()
  id: string;

  /**
   * A reference to the waitlist entries created by the user. This is a one-to-many relationship. A user can create many waitlist entries. A waitlist entry can only be created by one user.
   */
  @OneToMany(() => WaitlistEntry, waitlistEntry => waitlistEntry.user)
  waitlistEntries: WaitlistEntry[];
}