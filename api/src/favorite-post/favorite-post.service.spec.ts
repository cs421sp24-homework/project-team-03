import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePostService } from './favorite-post.service';
import { Repository } from 'typeorm';
import { favoritePost } from './favorite-post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostsService } from 'src/posts/posts.service';
import { Post } from 'src/posts/post.entity';

describe('FavoritePostService', () => {
  let service: FavoritePostService;
  let postService: PostsService;
  let repository: Repository<favoritePost>;
  let postRepository: Repository<Post>

  const FAV_POST_REPO_TOKEN = getRepositoryToken(favoritePost);
  const POST_REPO_TOKEN = getRepositoryToken(Post);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritePostService,
        PostsService,
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
      ],
    }).compile();

    service = module.get<FavoritePostService>(FavoritePostService);
    postService = module.get<PostsService>(PostsService);
    repository = module.get<Repository<favoritePost>>(FAV_POST_REPO_TOKEN);
    postRepository = module.get<Repository<Post>>(POST_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
