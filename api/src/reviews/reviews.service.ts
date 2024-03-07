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
  ): Promise<Review> {
    const review = await this.reviewRepository.create({
      ...createReviewDto,
      housingId,
      userId,
    });

    // increment review count by 1 and update average rating for housing item
    await this.housingService.updateAvgReview(review.rating, housingId);
    return this.reviewRepository.save(review);
  }
}
