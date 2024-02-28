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

  @Column({ default: '$' })
  price: string;

  @Column('decimal', { precision: 6, scale: 1 })
  distance: number;

  @Column({ default: null })
  avgRating: number | null; // calculated from Reviews posted

  @Column({ default: 0 })
  reviewCount: number; // calculated from Reviews posted
}
