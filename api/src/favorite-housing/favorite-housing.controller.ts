import { Controller, Delete, Get, NotFoundException, Param, Post, Query, UseGuards } from '@nestjs/common';
import { FavoriteHousingService } from './favorite-housing.service';
import { HousingExistsGuard } from 'src/guards/housing-exists.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { favoriteHousingResponseDto } from './favoriteHousing-response.dto';
import { favoriteHousing } from './favorite-housing.entity';

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
    @Param('faovriteHousingId') id: string,
    @Param('housingId') housingId: string,
  ): Promise<favoriteHousingResponseDto> {
    const review = await this.favoriteHousingService.findOne(id, housingId);
    if (!review) {
      throw new NotFoundException(
        `Review with ID ${id} not found in housing item with ID ${housingId}`,
      );
    }
    delete review.userId;
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':favoriteHousingId')
  async remove(
    @Param('favoriteHousingId') favoriteHousingId: string,
    @Param('housingId') housingId: string,
  ): Promise<{ statusCode: number; message: string }> {
    const favorite_housing = await this.favoriteHousingService.remove(
      favoriteHousingId,
      housingId,
    );
    if (!favorite_housing) {
      throw new NotFoundException(
        `Review with ID ${favoriteHousingId} not found in housing item with ID ${housingId}`,
      );
    }

    // call housingService aggregate review

    return {
      statusCode: 200,
      message: 'Review deleted successfully',
    };
  }

  @UseGuards(HousingExistsGuard)
  @Get(':userId')
  async findAll(
    @Param('userId') userId: number,
  ): Promise<favoriteHousing[] | null> {
    console.log("Hello!")
    const favorite_housings = await this.favoriteHousingService.findAll(userId);
    console.log(userId)
    console.log(favorite_housings);
    return favorite_housings;
  }
}
