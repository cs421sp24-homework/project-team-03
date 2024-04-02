import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewsService } from './reviews.service';
import { Review } from './review.entity';
import { HousingService } from 'src/housing/housing.service';
import { User } from 'src/user/user.entity';
import { Housing } from 'src/housing/housing.entity';
import { CreateReviewDto } from './create-review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let repository: Repository<Review>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let housingRepository: Repository<Housing>; // Add housingRepository
  let housingService: HousingService;

  const REVIEW_REPO_TOKEN = getRepositoryToken(Review);
  const HOUSING_REPO_TOKEN = getRepositoryToken(Housing); // Add housing repository token

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        HousingService,
        {
          provide: REVIEW_REPO_TOKEN,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              limit: jest.fn().mockReturnThis(),
              offset: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              getMany: jest.fn(),
            }),
            save: jest.fn(),
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

    service = module.get<ReviewsService>(ReviewsService);
    repository = module.get<Repository<Review>>(REVIEW_REPO_TOKEN);
    housingRepository = module.get<Repository<Housing>>(HOUSING_REPO_TOKEN); // Get housing repository
    housingService = module.get<HousingService>(HousingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
    notifications: 0,
  };

  const mockHousing: Housing = {
    id: '1',
    name: 'Example Housing',
    address: '123 Example St',
    latitude: 0,
    longitude: 0,
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
    likedBy: [],
    housing: mockHousing,
    housingId: '1',
    ensureRatingNonNegative: function (): void {
      throw new Error('Function not implemented.');
    },
  };

  const updatedHousingAfterAddReview: Housing = {
    id: '1',
    name: 'Example Housing',
    address: '123 Example St',
    latitude: 0,
    longitude: 0,
    imageURL: 'http://example.com/housing.jpg',
    price: '$$$',
    distance: 0.3,
    avgRating: 4,
    reviewCount: 2,
    reviews: [review], // Assuming reviews are an array of Review entities
  };

  const updatedHousingAfterDeleteReview: Housing = {
    id: '1',
    name: 'Example Housing',
    address: '123 Example St',
    latitude: 0,
    longitude: 0,
    imageURL: 'http://example.com/housing.jpg',
    price: '$$$',
    distance: 0.3,
    avgRating: 4,
    reviewCount: 1,
    reviews: [review], // Assuming reviews are an array of Review entities
  };

  describe('findOne', () => {
    it('should return a single review', async () => {
      const reviewId = 'uuid-id';
      const housingId = '1';

      // Mocking the ensureRatingNonNegative function
      const reviewWithNonNegRating: Review = {
        ...review,
        ensureRatingNonNegative: jest.fn(), // Mocking the function
      };

      jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(reviewWithNonNegRating);

      expect(await service.findOne(reviewId, housingId)).toEqual(
        reviewWithNonNegRating,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: reviewId, housingId },
      });
    });
  });

  describe('create', () => {
    it('should create a new review and update average rating for housing', async () => {
      const createReviewDto: CreateReviewDto = {
        content: 'Great place to stay!',
        rating: 4,
      };
      const housingId = '1';
      const userId = 1;

      // Mock create method of reviewRepository to return the created review
      jest.spyOn(repository, 'create').mockReturnValueOnce(review);

      // Mock save method of reviewRepository to return the created review
      jest.spyOn(repository, 'save').mockResolvedValueOnce(review);

      // Mock updateAvgReviewAfterCreate method of housingService
      jest
        .spyOn(housingService, 'updateAvgReviewAfterCreate')
        .mockImplementationOnce(() =>
          Promise.resolve(updatedHousingAfterAddReview),
        );

      // Call create method of ReviewsService
      const createdReview = await service.create(
        createReviewDto,
        housingId,
        userId,
      );

      // Assert that the review is created and returned
      expect(createdReview).toEqual(review);

      // Assert that create method of reviewRepository is called with correct parameters
      expect(repository.create).toHaveBeenCalledWith({
        ...createReviewDto,
        housingId,
        userId,
      });

      // Assert that save method of reviewRepository is called with correct parameters
      expect(repository.save).toHaveBeenCalledWith(review);

      // Assert that updateAvgReviewAfterCreate method of housingService is called with correct parameters
      expect(housingService.updateAvgReviewAfterCreate).toHaveBeenCalledWith(
        createReviewDto.rating,
        housingId,
      );
    });
  });

  describe('remove', () => {
    it('should remove a review and update average rating for housing', async () => {
      const reviewId = 'uuid-id';
      const housingId = '1';

      // Mock findOne method of ReviewsService to return a review
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(review);

      // Mock remove method of reviewRepository to return the removed review
      jest.spyOn(repository, 'remove').mockResolvedValueOnce(review);

      // Mock updateAvgReviewAfterDelete method of housingService
      jest
        .spyOn(housingService, 'updateAvgReviewAfterDelete')
        .mockResolvedValueOnce(updatedHousingAfterDeleteReview);

      // Call remove method of ReviewsService
      const removedReview = await service.remove(reviewId, housingId);

      // Assert that the review is removed and returned
      expect(removedReview).toEqual(review);

      // Assert that findOne method of ReviewsService is called with correct parameters
      expect(service.findOne).toHaveBeenCalledWith(reviewId, housingId);

      // Assert that remove method of reviewRepository is called with correct parameters
      expect(repository.remove).toHaveBeenCalledWith(review);

      // Assert that updateAvgReviewAfterDelete method of housingService is called with correct parameters
      expect(housingService.updateAvgReviewAfterDelete).toHaveBeenCalledWith(
        review.rating,
        housingId,
      );
    });

    it('should return null if review is not found', async () => {
      const reviewId = 'uuid-id';
      const housingId = '1';

      // Mock findOne method of ReviewsService to return null
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(null);

      // Call remove method of ReviewsService
      const removedReview = await service.remove(reviewId, housingId);

      // Assert that removedReview is null
      expect(removedReview).toBeNull();

      // Assert that findOne method of ReviewsService is called with correct parameters
      expect(service.findOne).toHaveBeenCalledWith(reviewId, housingId);

      // Assert that remove method of reviewRepository is not called
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return reviews based on provided parameters', async () => {
      // Mock getMany method of query builder to return mock reviews
      const resultReviewArray: Review[] = [
        { ...review, content: 'Review A', ensureRatingNonNegative: jest.fn() },
        { ...review, content: 'Review B', ensureRatingNonNegative: jest.fn() },
        { ...review, content: 'Review C', ensureRatingNonNegative: jest.fn() },
      ];

      const limit = 10;
      const offset = 0;
      const housingId = '1';
      const search = 'Review';
      const withUserData = true;
      const queryBuilder = {
        limit: jest.fn().mockReturnThis(),
        offset: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(resultReviewArray),
      };

      repository.createQueryBuilder = jest.fn().mockReturnValue(queryBuilder);

      // Call findAll method of ReviewsService
      const foundReviews = await service.findAll(
        limit,
        offset,
        housingId,
        search,
        null,
        withUserData,
      );

      // Assert that the query builder is constructed correctly
      expect(repository.createQueryBuilder).toHaveBeenCalledWith('review');

      expect(
        repository.createQueryBuilder('review').limit,
      ).toHaveBeenCalledWith(limit);
      expect(
        repository.createQueryBuilder('review').offset,
      ).toHaveBeenCalledWith(offset);
      expect(
        repository.createQueryBuilder('review').andWhere,
      ).toHaveBeenCalledWith('review.content ILIKE :search', {
        search: `%${search}%`,
      });

      expect(repository.createQueryBuilder().where).toHaveBeenCalledWith(
        'review.housingId = :housingId',
        { housingId },
      );

      expect(repository.createQueryBuilder().orderBy).toHaveBeenCalledWith(
        'review.timestamp',
        'DESC',
      );
      expect(
        repository.createQueryBuilder().leftJoinAndSelect,
      ).toHaveBeenCalledWith('review.user', 'user');

      // Assert that the reviews are retrieved correctly
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(foundReviews).toEqual(resultReviewArray);
    });
  });
});
