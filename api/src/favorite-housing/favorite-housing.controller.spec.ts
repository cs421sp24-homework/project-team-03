import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteHousingController } from './favorite-housing.controller';
import { FavoriteHousingService } from './favorite-housing.service';
import { FavoriteHousingModule } from './favorite-housing.module';
import { HousingService } from 'src/housing/housing.service';

describe('FavoriteHousingController', () => {
  let service: FavoriteHousingService;
  let housingssService: HousingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FavoriteHousingModule],
      controllers: [FavoriteHousingController],
      providers: [FavoriteHousingService, HousingService]
    }).compile();

    service = module.get<FavoriteHousingService>(FavoriteHousingService)
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
