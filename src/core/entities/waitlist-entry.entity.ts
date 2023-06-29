import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../core/entities/user.entity';

/**
 * Stores waitlist entry information such as id, email, status, createdAt, confirmationToken, and user
 * A waitlist entry is created when a user signs up for the waitlist
 */
@Entity()
export class WaitlistEntry {
  /**
   * Unique identifier for the waitlist entry
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The email address of the user who signed up for the waitlist
   */
  @Column()
  email: string;

  /**
   * The status of the waitlist entry (pending, confirmed, removed)
   */
  @Column({ default: 'pending' })
  status: string;

  /**
   * The date and time when the waitlist entry was created
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  /**
   * The unique token generated for the waitlist entry
   */
  @Column({ nullable: true })
  confirmationToken: string;

  /**
   * A reference to the user who created the waitlist entry. This is a many-to-one relationship. A user can create many waitlist entries. A waitlist entry can only be created by one user.
   */
  @ManyToOne(() => User, user => user.waitlistEntries)
  user: User;
}