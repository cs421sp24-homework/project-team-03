import { Controller, Post, Body, UnauthorizedException, Get, Delete, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserResponseDTO } from './user-response.dto';
import { UserLoginDTO } from './user-login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  // this is just for us -- delete before submitting
    @Get()
    async getAll() {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":email")
    async getOne(
        @Param("email") email: string,
    ) : Promise<UserResponseDTO> {
        const user = await this.userService.findOne(email);



        if (!user) {
            throw new BadRequestException("User does not exist");
          }
    
        delete user.password;
        return user;
    }

    @Delete(":email")
    async remove(
     @Param("email") email: string,
    ): Promise<{ statusCode: number; message: string }> {
        await this.userService.deleteUser(email);
        return {
        statusCode: 200,
        message: "User removed successfully",
        };
    }

    @Post('register')
    async register(@Body() userDto: CreateUserDTO): Promise<UserResponseDTO> {
        const user = await this.userService.createUser(userDto);
        delete user.password;
        return user;
    }

    @Post('login')
    async login(@Body() userDto: UserLoginDTO): Promise<{
        access_token: string;
    }> {
        const user = await this.authService.validateUser(
            userDto.email,
            userDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
