import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePostController } from './favorite-post.controller';

describe('FavoritePostController', () => {
  let controller: FavoritePostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritePostController],
    }).compile();

    controller = module.get<FavoritePostController>(FavoritePostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
