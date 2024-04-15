import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { favoritePost } from './favorite-post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritePostService {
  constructor(
    @InjectRepository(favoritePost)
    private favoritePostRepository: Repository<favoritePost>,
  ) {}

  async create(postId: string, userId: number): Promise<favoritePost | null> {
    const favorite_post = await this.favoritePostRepository.create({
      postId,
      userId,
    });

    return this.favoritePostRepository.save(favorite_post);
  }

  async findOne(userId: number, postId: string): Promise<favoritePost | null> {
    return this.favoritePostRepository.findOne({
      where: {
        userId,
        postId,
      },
    });
  }

  async remove(userId: number, postId: string): Promise<favoritePost | null> {
    const favorite_post = await this.findOne(userId, postId);
    if (!favorite_post) {
      return null;
    }
    return this.favoritePostRepository.remove(favorite_post);
  }

  async findAll(userId: number): Promise<favoritePost[] | null> {
    const query = this.favoritePostRepository
      .createQueryBuilder('favoritePost')
      .where('favoritePost.userId = :userId', { userId })

    const favoritePosts = await query.getMany();

    return favoritePosts;
  }
}
