import { Post } from 'src/posts/post.entity';
import { Review } from 'src/reviews/review.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  verificationToken: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  // NEW - user can have multiple reviews
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column({ nullable: true })
  bio: string;

  @Column({ default: 0 })
  notifications: number;
}
