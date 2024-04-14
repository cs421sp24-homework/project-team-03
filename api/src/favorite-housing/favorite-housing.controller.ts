import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { FavoriteHousingService } from './favorite-housing.service';
import { HousingExistsGuard } from 'src/guards/housing-exists.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { favoriteHousingResponseDto } from './favoriteHousing-response.dto';

@Controller('housings/:housingId/favoriteHousings')
export class FavoriteHousingController {
  constructor(
    private readonly favoriteHousingService: FavoriteHousingService,
  ) {}

  @UseGuards(HousingExistsGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Param('housingId') housingId: string,
    @UserId() userId: number,
  ): Promise<favoriteHousingResponseDto> {
    const favorite_housing = await this.favoriteHousingService.create(
      housingId,
      userId,
    );
    delete favorite_housing.userId;
    return favorite_housing;
  }
 
  @Get(':housingId')
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
  @UseGuards(JwtAuthGuard)
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

    // call housingService aggregate review

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
    const { limit, offset, search, sortBy, withUserData } = query;

    const reviews = await this.reviewsService.findAll(
      limit,
      offset,
      housingId,
      search,
      sortBy,
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
