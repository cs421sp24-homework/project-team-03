import { Housing } from 'src/housing/housing.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ default: 0 })
  upvoteCount: number;

  // many reviews written by a single user
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  // many reviews for a single housing
  @ManyToOne(() => Housing, (housing) => housing.reviews)
  @JoinColumn({ name: 'housingId' })
  housing: Housing;

  @Column()
  housingId: number;
}
