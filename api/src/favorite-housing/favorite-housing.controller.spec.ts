import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteHousingController } from './favorite-housing.controller';
import { FavoriteHousingService } from './favorite-housing.service';
import { FavoriteHousingModule } from './favorite-housing.module';
import { HousingService } from 'src/housing/housing.service';
import { Repository } from 'typeorm';
import { favoriteHousing } from './favorite-housing.entity';
import { Housing } from 'src/housing/housing.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RouteParamMetadata } from '@nestjs/common';

describe('FavoriteHousingController', () => {
  let controller: FavoriteHousingController;
  let service: FavoriteHousingService;
  let housingService: HousingService;
  let repository: Repository<favoriteHousing>;
  let housingRepository: Repository<Housing>;

  const FAV_HOUSING_REPO_TOKEN = getRepositoryToken(favoriteHousing);
  const HOUSING_REPO_TOKEN = getRepositoryToken(Housing);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteHousingController],
      providers: [
        FavoriteHousingService, 
        HousingService,
        {
          provide: FAV_HOUSING_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: HOUSING_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ]
    }).compile();

    controller = module.get<FavoriteHousingController>(FavoriteHousingController);
    service = module.get<FavoriteHousingService>(FavoriteHousingService);
    housingService = module.get<HousingService>(HousingService);
    repository = module.get<Repository<favoriteHousing>>(FAV_HOUSING_REPO_TOKEN);
    housingRepository = module.get<Repository<Housing>>(HOUSING_REPO_TOKEN);
    
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
