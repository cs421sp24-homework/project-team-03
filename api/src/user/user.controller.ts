import { Controller, Post, Body, UnauthorizedException, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserResponseDTO } from './user-response.dto';
import { UserLoginDTO } from './user-login.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

    @Get()
    async getAll() {
        return this.userService.getAll();
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
