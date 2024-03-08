import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Post } from '@nestjs/common';
import { ReviewResponseDto } from './review-response.dto';
import { CreateReviewDto } from './create-review.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { FindReviewsQueryDTO } from './find-reviews-query.dto';
import { FindReviewsResponseDTO } from './find-reviews-response.dto';
import { ReviewOwnershipGuard } from 'src/guards/review-owner.guard';
import { HousingExistsGuard } from 'src/guards/housing-exists.guard';

@UseGuards(JwtAuthGuard)
@Controller('housings/:housingId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(HousingExistsGuard)
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
    if (!review) {
      throw new NotFoundException(`Housing with ID ${housingId} not found`);
    }
    delete review.userId;
    return review;
  }

  @Get(':reviewId')
  async findOne(
    @Param('reviewId') id: string,
    @Param('housingId') housingId: string,
  ): Promise<ReviewResponseDto> {
    const review = await this.reviewsService.findOne(id, housingId);
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${id} not found in housing item with ID ${housingId}`,
      );
    }
    delete review.userId;
    return review;
  }

  @UseGuards(ReviewOwnershipGuard)
  @Delete(':reviewId')
  async remove(
    @Param('reviewId') reviewId: string,
    @Param('housingId') housingId: string,
  ): Promise<{ statusCode: number; message: string }> {
    const review = await this.reviewsService.remove(reviewId, housingId);
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${reviewId} not found in housing item with ID ${housingId}`,
      );
    }
    return {
      statusCode: 200,
      message: 'Review deleted successfully',
    };
  }

  @UseGuards(HousingExistsGuard)
  @Get()
  async findAll(
    @Param('housingId') housingId: string,
    @Query() query: FindReviewsQueryDTO,
  ): Promise<FindReviewsResponseDTO> {
    const { limit, offset, search, withUserData } = query;

    const reviews = await this.reviewsService.findAll(
      limit,
      offset,
      housingId,
      search,
      withUserData,
    );

    return {
      limit,
      offset,
      search,
      withUserData,
      data: reviews.map((review) => {
        delete review.userId;
        if (review.user) {
          delete review.user.password;
        }
        return review;
      }),
    };
  }
}
