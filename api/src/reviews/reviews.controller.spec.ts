import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { User } from 'src/user/user.entity';
import { Housing } from 'src/housing/housing.entity';
import { Review } from './review.entity';
import { HousingService } from 'src/housing/housing.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateReviewDto } from './create-review.dto';
import { NotFoundException } from '@nestjs/common';

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let reviewsService: ReviewsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let housingService: HousingService;

  const REVIEW_REPO_TOKEN = getRepositoryToken(Review);
  const HOUSING_REPO_TOKEN = getRepositoryToken(Housing); // Add housing repository token

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        HousingService,
        {
          provide: REVIEW_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            findAll: jest.fn(),
          },
        },
        {
          provide: HOUSING_REPO_TOKEN, // Provide mock for Housing Repository
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            save: jest.fn(),
            // Mock other methods as needed
          },
        },
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
    housingService = module.get<HousingService>(HousingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const mockUser: User = {
    id: 1,
    password: 'hashedpassword123',
    email: 'example@jhu.edu',
    avatar: 'http://example.com/avatar.jpg',
    firstName: 'John',
    lastName: 'Doe',
    isEmailVerified: false,
    verificationToken: 'verificationToken123',
    posts: [],
    reviews: [],
    bio: null,
  };

  const mockHousing: Housing = {
    id: '1',
    name: 'Example Housing',
    address: '123 Example St',
    imageURL: 'http://example.com/housing.jpg',
    price: '$$$',
    distance: 0.3,
    avgRating: 4,
    reviewCount: 1,
    reviews: [], // Assuming reviews are an array of Review entities
  };

  const review: Review = {
    id: 'uuid-id',
    content: 'Great place to stay!',
    timestamp: new Date(),
    rating: 4,
    upvoteCount: 0,
    user: mockUser,
    userId: 1,
    housing: mockHousing,
    housingId: '1',
    ensureRatingNonNegative: function (): void {
      throw new Error('Function not implemented.');
    },
  };

  // Test for create
  describe('create', () => {
    it('should create a review and return it', async () => {
      const createReviewDto: CreateReviewDto = {
        content: 'Great place to stay!',
        rating: 4,
      };
      const housingId = '1';
      const userId = 1;

      // Mock the create method of reviewsService to return a review
      jest.spyOn(reviewsService, 'create').mockResolvedValue(review);

      const result = await controller.create(
        createReviewDto,
        housingId,
        userId,
      );

      expect(result).toBe(review);
      expect(reviewsService.create).toHaveBeenCalledWith(
        createReviewDto,
        housingId,
        userId,
      );
    });
  });

  // Test for findOne
  describe('findOne', () => {
    it('should retrieve a single review by ID', async () => {
      jest.spyOn(reviewsService, 'findOne').mockResolvedValue(review);

      const reviewId = 'uuid-id';
      const housingId = '1';

      const result = await controller.findOne(reviewId, housingId);

      expect(reviewsService.findOne).toHaveBeenCalledWith(reviewId, housingId);
      expect(result).toEqual(review);
    });

    it('should throw NotFoundException if review not found', async () => {
      jest.spyOn(reviewsService, 'findOne').mockResolvedValue(undefined);

      await expect(
        controller.findOne('non-existent-id', 'non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Test for remove
  describe('remove', () => {
    it('should delete a review', async () => {
      jest.spyOn(reviewsService, 'remove').mockResolvedValue(review);
      const reviewId = 'uuid-id';
      const housingId = '1';
      const result = await controller.remove(reviewId, housingId);

      expect(reviewsService.remove).toHaveBeenCalledWith(reviewId, housingId);
      expect(result).toEqual({
        statusCode: 200,
        message: 'Review deleted successfully',
      });
    });

    it('should throw NotFoundException if review to delete not found', async () => {
      jest.spyOn(reviewsService, 'remove').mockResolvedValue(undefined);

      await expect(
        controller.remove('non-existent-id', 'non-existent-id'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  // Test for findAll method
  describe('findAll', () => {
    it('should retrieve reviews', async () => {
      const mockReviews = [review]; // Use your mockPost array
      jest.spyOn(reviewsService, 'findAll').mockResolvedValue(mockReviews);

      const housingId = '1';

      const result = await controller.findAll(housingId, {
        limit: 10,
        offset: 0,
        search: 'Great!',
        withUserData: true,
      });

      expect(result.data).toEqual(
        mockReviews.map((review) => {
          delete review.userId;
          return review;
        }),
      );
    });
  });
});
