import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { CreatePostDto } from './create-post.dto';
import { UpdatePostDto } from './update-post.dto';
import { NotFoundException } from '@nestjs/common';
import { PostResponseDto } from './post-response.dto';

describe('PostsController', () => {
  let controller: PostsController;
  let postsService: PostsService;
  let postRepository: Repository<Post>;
  let userService: UserService;
  let authService: AuthService;
  let jwtService: JwtService;

  const POST_REPO_TOKEN = getRepositoryToken(Post);
  const USER_REPO_TOKEN = getRepositoryToken(User);

  const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    password: 'hashedPassword',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'http://example.com/avatar.jpg',
    isEmailVerified: true,
    verificationToken: null,
    posts: [],
    reviews: [],
    bio: null,
  };

  const mockPost: Post = {
    id: 'uuid-1234', // Mock UUID
    title: 'Spacious Room Available',
    content: 'A spacious room in a shared apartment is available for rent.',
    timestamp: new Date(), // Current timestamp
    cost: 500, // Example cost in your preferred currency
    address: '123 Main Street, City, Country',
    images: 'http://example.com/image1.jpg', // Array of image URLs
    user: mockUser, // Associated User entity
    userId: mockUser.id, // ID of the associated user
    type: 'Roommate', // PostType, e.g., 'Roommate', 'Sublet', or 'Housing'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        PostsService,
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
        UserService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            remove: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        AuthService,
        JwtService,
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(POST_REPO_TOKEN);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('postService should be defined', () => {
    expect(postsService).toBeDefined();
  });

  it('PostRepository should be defined', () => {
    expect(postRepository).toBeDefined();
  });

  // Test for create
  it('should create a new post', async () => {
    const createPostDto = new CreatePostDto(); // Fill in with appropriate mock data
    jest.spyOn(postsService, 'create').mockResolvedValue(mockPost);

    const result = await controller.create(createPostDto, mockUser.id);

    expect(postsService.create).toHaveBeenCalledWith(
      createPostDto,
      mockUser.id,
    );
    expect(result).toEqual(mockPost);
  });

  // Test for findOne
  it('should retrieve a single post by ID', async () => {
    jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

    const result = await controller.findOne('1');

    expect(postsService.findOne).toHaveBeenCalledWith('1');
    expect(result).toEqual(mockPost);
  });

  it('should throw NotFoundException if post not found', async () => {
    jest.spyOn(postsService, 'findOne').mockResolvedValue(undefined);

    await expect(controller.findOne('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  // Test for findAll
  it('should retrieve all posts with pagination, search, and additional filters', async () => {
    const mockPosts = [mockPost];
    jest.spyOn(postsService, 'findAll').mockResolvedValue(mockPosts);
  
    const search = 'sample search';
    const email = 'user@jhu.edu';
    const withUserData = true;
    const type = 'Housing';
    const cost = 5000;
    const newuse = new PostResponseDto;
    expect(newuse instanceof PostResponseDto).toBe(true);
  
    const result = await controller.findAll(10, 0, search,undefined, withUserData, type, cost);
  
    expect(postsService.findAll).toHaveBeenCalledWith(
      10,
      0,
      search,
      undefined, // Since userId is derived from the email inside the method
      withUserData,
      type,
      cost
    );
    expect(result.data).toEqual(mockPosts);
    expect(result.pagination).toEqual({ limit: 10, offset: 0 });
    expect(result.search).toEqual(search);
  });
  

  // Test for findAll method
  describe('findAll', () => {
    it('should retrieve posts without email filter', async () => {
      const mockPosts = [mockPost]; // Use your mockPost array
      jest.spyOn(postsService, 'findAll').mockResolvedValue(mockPosts);
    
      const result = await controller.findAll(10, 0, '', undefined, false, undefined, undefined);
    
      expect(postsService.findAll).toHaveBeenCalledWith(
        10,
        0,
        '',
        undefined, // userId is undefined as no email is provided
        false,     // withUserData is false
        undefined, // type is not provided, so it's undefined
        undefined
      );
      expect(result.data).toEqual(
        mockPosts.map((post) => {
          delete post.userId;
          if (post.user) {
            delete post.user.password;
          }
          return post;
        }),
      );
      expect(result.pagination).toEqual({ limit: 10, offset: 0 });
      // Add additional assertions if needed, like for the 'filter' and 'search' fields
    });
    

    it('should retrieve posts with email filter', async () => {
      const mockPosts = [mockPost]; // Use your mockPost array
      const userEmail = 'user@example.com';
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser); // Assuming mockUser exists
      jest.spyOn(postsService, 'findAll').mockResolvedValue(mockPosts);
    
      const result = await controller.findAll(10, 0, '', userEmail, false);
    
      expect(userService.findOne).toHaveBeenCalledWith(userEmail);
      expect(postsService.findAll).toHaveBeenCalledWith(
        10,
        0,
        '',
        mockUser.id, // Assuming the user exists and mockUser has an id property
        false,
        undefined, // type is not provided, so it's undefined
        undefined      // default cost value
      );
      expect(result.data).toEqual(
        mockPosts.map((post) => {
          delete post.userId;
          if (post.user) {
            delete post.user.password;
          }
          return post;
        }),
      );
      expect(result.pagination).toEqual({ limit: 10, offset: 0 });
      // The filter should reflect the email used for filtering
      expect(result.filter).toEqual(userEmail);
    });
    

    it('should throw NotFoundException if user not found for provided email', async () => {
      jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);

      await expect(
        controller.findAll(10, 0, '', 'non-existent-email'),
      ).rejects.toThrow(NotFoundException);
    });

    // Test for update
    it('should update a post', async () => {
      const updatePostDto = new UpdatePostDto(); // Fill in with appropriate mock data
      jest.spyOn(postsService, 'update').mockResolvedValue(mockPost);

      const result = await controller.update('1', updatePostDto);

      expect(postsService.update).toHaveBeenCalledWith('1', updatePostDto);
      expect(result).toEqual(mockPost);
    });

    it('should throw NotFoundException if post to update not found', async () => {
      jest.spyOn(postsService, 'update').mockResolvedValue(undefined);

      await expect(
        controller.update('non-existent-id', new UpdatePostDto()),
      ).rejects.toThrow(NotFoundException);
    });

    // Test for remove
    it('should delete a post', async () => {
      jest.spyOn(postsService, 'remove').mockResolvedValue(mockPost);

      const result = await controller.remove('1');

      expect(postsService.remove).toHaveBeenCalledWith('1');
      expect(result).toEqual({
        statusCode: 200,
        message: 'Post deleted successfully',
      });
    });

    it('should throw NotFoundException if post to delete not found', async () => {
      jest.spyOn(postsService, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });

    // Add more tests as necessary for different scenarios
  });
});
