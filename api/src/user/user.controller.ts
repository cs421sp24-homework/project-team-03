import { Controller, Post, Body, UnauthorizedException, Get, Delete, Param, UseGuards, BadRequestException, NotFoundException, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserResponseDTO } from './user-response.dto';
import { UserLoginDTO } from './user-login.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateUserDTO } from './update-user.dto';

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

    // also just for us so that we can clear the database on the back end, unless we make it so that users can delete their own accounts
    // we can remove before submitting
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

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDTO,
    ): Promise<UserResponseDTO> {
        const user = await this.userService.update(id, updateUserDto);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        
        delete user.password;
        return user;
    }
    
}
