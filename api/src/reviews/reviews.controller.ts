import { Body, Controller, Param, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Post } from '@nestjs/common';
import { ReviewResponseDto } from './review-response.dto';
import { CreateReviewDto } from './create-review.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('housings/:housingId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('housingId') housingId: string,
    @UserId() userId: number,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewsService.create(
      createReviewDto,
      housingId,
      userId,
    );
    delete review.userId;
    return review;

    // make sure housingID is valid and exists
    // UPDATE avgRating field in housing item
  }
}
