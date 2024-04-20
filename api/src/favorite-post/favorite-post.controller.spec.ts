import { Test, TestingModule } from '@nestjs/testing';
import { FavoritePostController } from './favorite-post.controller';
import { FavoritePostService } from './favorite-post.service';
import { FavoritePostModule } from './favorite-post.module';
import { PostsService } from 'src/posts/posts.service';
import { Repository } from 'typeorm';
import { favoritePost } from './favorite-post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('FavoritePostController', () => {
  let service: FavoritePostService;
  let postsService: PostsService; // Declare a variable for the dependency
  let favoritePostRespository: Repository<favoritePost>

  const FAVO_POST_REPO_TOKEN = getRepositoryToken(favoritePost);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritePostController],
      imports: [FavoritePostModule],
      providers: [
        FavoritePostService,
        PostsService, // Add PostsService to the providers array
        // Add other dependencies if any
        // You might need to provide the repository here if it's not imported through a module
      ],
    }).compile();

    service = module.get<FavoritePostService>(FavoritePostService);
    postsService = module.get<PostsService>(PostsService); // Get instance of PostsService
  });

})
