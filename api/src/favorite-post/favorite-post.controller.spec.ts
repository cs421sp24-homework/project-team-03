import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePostController } from './favorite-post.controller';
import { FavoritePostService } from './favorite-post.service';
import { FavoritePostModule } from './favorite-post.module';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { favoritePost } from './favorite-post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';

describe('FavoritePostController', () => {
  let controller: FavoritePostController;
  let service: FavoritePostService;
  let postsService: PostsService; // Declare a variable for the dependency
  let repository: Repository<favoritePost>;
  let postRepository: Repository<Post>;

  const FAV_POST_REPO_TOKEN = getRepositoryToken(favoritePost);
  const POST_REPO_TOKEN = getRepositoryToken(Post);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritePostController],
      providers: [
        FavoritePostService,
        PostsService, // Add PostsService to the providers array
        {
          provide: FAV_POST_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          }
        },
        {
          provide: POST_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOneBy: jest.fn(),
            createQueryBuilder: jest.fn(),
            save: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
        // Add other dependencies if any
        // You might need to provide the repository here if it's not imported through a module
      ],
    }).compile();

    controller = module.get<FavoritePostController>(FavoritePostController);
    service = module.get<FavoritePostService>(FavoritePostService);
    postsService = module.get<PostsService>(PostsService); // Get instance of PostsService
    repository = module.get<Repository<favoritePost>>(FAV_POST_REPO_TOKEN);
    postRepository = module.get<Repository<Post>>(POST_REPO_TOKEN)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
})
