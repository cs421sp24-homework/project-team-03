import { Controller, Param, UseGuards } from '@nestjs/common';
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
  
}
