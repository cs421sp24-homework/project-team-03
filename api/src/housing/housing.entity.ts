import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Housing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  imageURL: string;

  @Column({ default: null })
  rating: number | null;

  @Column({ default: 0 })
  reviewCount: number;

  // @OneToMany(() => Review, (review) => review.housing)
  // reviews: Review[];
}
