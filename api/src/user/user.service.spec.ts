import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDTO } from './create-user.dto';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const USER_REPO_TOKEN = getRepositoryToken(User);

  const mockUser: User = {
    id: 1,
    email: 'example@jhu.edu',
    password: 'hashedPassword', // In real scenarios, this would be a hashed password
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'http://example.com/avatar.jpg', // Can be null if testing for nullability
    isEmailVerified: false,
    verificationToken: 'someRandomVerificationToken', // Can also be null
    posts: [], // Assuming this user has no posts initially; you can add mock posts if needed
    reviews: []
  };
  
  const userDto: CreateUserDTO = {
    email: 'example@jhu.edu',
    password: 'StrongPass123!',
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'http://example.com/avatar.jpg', // This field is optional
  };
  
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService, 
        {
          provide: USER_REPO_TOKEN,
          useValue: {
            create:  jest.fn(),
            remove:  jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            find: jest.fn()
          }
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(USER_REPO_TOKEN);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('UserRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const mockUsers: User[] = [mockUser, mockUser];
      jest.spyOn(userRepository, 'find').mockResolvedValue(mockUsers);
  
      const result = await userService.getAll();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
  
      const result = await userService.findOne('user@example.com');
      expect(result).toEqual(mockUser);
    });
  });

  describe('createUser', () => {
    it('should successfully create a user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(undefined);
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
      jest.spyOn(userRepository, 'create').mockReturnValue(mockUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser);
  
      const result = await userService.createUser(userDto);
      expect(result).toEqual(mockUser);
    });
  
    it('should throw an error if email already exists', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
  
      await expect(userService.createUser(userDto)).rejects.toThrow(BadRequestException);
    });
  });


  describe('deleteUser', () => {
    it('should delete a user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);
      jest.spyOn(userRepository, 'remove').mockResolvedValue(mockUser);
  
      const result = await userService.deleteUser('user@example.com');
      expect(result).toEqual(mockUser);
    });
  });
  
  
  
  
});
