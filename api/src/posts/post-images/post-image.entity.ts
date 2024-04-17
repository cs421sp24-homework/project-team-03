import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "../post.entity";

// Table for storing meta-data of images uploaded to Supabase storage
@Entity()
export class PostImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  path: string;

  @ManyToOne(() => Post, (post) => post.images, {
    onDelete: 'SET NULL', // TODO: soft delete
  })
  @JoinColumn({ name: 'postId'})
  post: Post;

  @Column({ nullable: true })
  postId: string; // for joining table row

  @DeleteDateColumn()
  // @Column({ nullable: true })
  deletedAt: Date;
}