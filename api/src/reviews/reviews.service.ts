import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './create-review.dto';
import { HousingService } from 'src/housing/housing.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    private housingService: HousingService,
  ) {}

  async create(
    createReviewDto: CreateReviewDto,
    housingId: string,
    userId: number,
  ): Promise<Review | null> {
    const review = await this.reviewRepository.create({
      ...createReviewDto,
      housingId,
      userId,
    });

    // Increment review count by 1 and update average rating for housing item
    await this.housingService.updateAvgReviewAfterCreate(
      review.rating,
      housingId,
    );
    return this.reviewRepository.save(review);
  }

  async findOne(id: string, housingId: string): Promise<Review | null> {
    return this.reviewRepository.findOne({
      where: {
        id,
        housingId,
      },
    });
  }

  async remove(id: string, housingId: string): Promise<Review | null> {
    const review = await this.findOne(id, housingId);
    if (!review) {
      return null;
    }

    // Decrement review count by 1 and update average review of housing item
    await this.housingService.updateAvgReviewAfterDelete(
      review.rating,
      housingId,
    );
    return this.reviewRepository.remove(review);
  }

  // Finds all reviews for the specific housing item
  async findAll(
    limit: number,
    offset: number,
    housingId: string,
    search?: string,
    withUserData?: boolean,
  ): Promise<Review[] | null> {
    let query = this.reviewRepository
      .createQueryBuilder('review')
      .where('review.housingId = :housingId', { housingId })
      .orderBy('review.timestamp', 'DESC')
      .limit(limit)
      .offset(offset);

    if (search) {
      query = query.andWhere('review.content ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (withUserData) {
      query = query.leftJoinAndSelect('review.user', 'user');
    }

    const reviews = await query.getMany();

    return reviews;
  }

  // Upvote a specific review
  async upvote(id: string, housingId: string): Promise<Review | null> {
    const review = await this.findOne(id, housingId);
    if (!review) {
      return null;
    }
    review.upvoteCount++;
    return this.reviewRepository.save(review);
  }
}
