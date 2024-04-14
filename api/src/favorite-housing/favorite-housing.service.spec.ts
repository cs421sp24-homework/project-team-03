import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteHousingService } from './favorite-housing.service';

describe('FavoriteHousingService', () => {
  let service: FavoriteHousingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteHousingService],
    }).compile();

    service = module.get<FavoriteHousingService>(FavoriteHousingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
