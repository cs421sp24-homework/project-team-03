import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUserService = {
      findOne: jest.fn(),
    };
    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);

    // Mock bcrypt.compare to always return true for testing purposes
    jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    const exampleUser: User = {
        id: 1,
        password: 'hashedpassword', // Assume this is a hashed password
        email: 'test@jhu.edu',
        avatar: 'http://example.com/avatar.jpg', // Optional, can be null
        firstName: 'John',
        lastName: 'Doe',
        isEmailVerified: false,
        verificationToken: 'some-verification-token', // Optional, can be null
        posts: [], // Array of Post entities, can be empty if not testing related functionality
      };
    it('should return a user object if validation is successful', async () => {
        const user = { id: 1, email: 'test@jhu.edu', password: 'hashedpassword' };
        jest.spyOn(userService, 'findOne').mockResolvedValue(exampleUser);
  
        const result = await authService.validateUser('test@example.com', 'password');
  
        expect(userService.findOne).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compare).toHaveBeenCalledWith('password', user.password);
        expect(result).toEqual(expect.objectContaining({ id: user.id, email: user.email }));
      });

      it('should return null if user is not found', async () => {
        // Arrange: Mock the userService's findOne method to simulate a user not being found
        jest.spyOn(userService, 'findOne').mockResolvedValue(null);
    
        // Act: Attempt to validate a user that does not exist
        const result = await authService.validateUser('nonexistent@example.com', 'password');
    
        // Assert: The result should be null, indicating validation failure due to user not found
        expect(userService.findOne).toHaveBeenCalledWith('nonexistent@example.com');
        expect(result).toBeNull();
      });
  });

  describe('login', () => {
    it('should return an access token', async () => {
        const exampleUser: User = {
            id: 1,
            password: 'hashedpassword', // Assume this is a hashed password
            email: 'test@jhu.edu',
            avatar: 'http://example.com/avatar.jpg', // Optional, can be null
            firstName: 'John',
            lastName: 'Doe',
            isEmailVerified: false,
            verificationToken: 'some-verification-token', // Optional, can be null
            posts: [], // Array of Post entities, can be empty if not testing related functionality
          };
      const expectedPayload = {
        email: exampleUser.email,
        id: exampleUser.id,
        firstName: exampleUser.firstName,
        lastName: exampleUser.lastName,
        avatar: exampleUser.avatar,
        isEmailVerified: exampleUser.isEmailVerified,
      };
  
      // Arrange: Spy on jwtService.sign and mock its implementation
      const signSpy = jest.spyOn(jwtService, 'sign').mockReturnValue('token');
  
      // Act: Call the login method
      const result = await authService.login(exampleUser);
  
      // Assert: The sign method should be called with the expected payload
      expect(signSpy).toHaveBeenCalledWith(expectedPayload);
      // Assert: The login method should return an access token
      expect(result).toEqual({ access_token: 'token' });
  
      // Clean up: Restore the original sign method implementation after the test
      signSpy.mockRestore();
    });
  });

  // More tests...
});
