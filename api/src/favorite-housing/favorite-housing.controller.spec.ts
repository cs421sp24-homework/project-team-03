import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteHousingController } from './favorite-housing.controller';

describe('FavoriteHousingController', () => {
  let controller: FavoriteHousingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteHousingController],
    }).compile();

    controller = module.get<FavoriteHousingController>(FavoriteHousingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
