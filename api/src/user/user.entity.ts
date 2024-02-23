import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 
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
  verificationToken: string

  // need to add posts

}
