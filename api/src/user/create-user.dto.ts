import { IsString, MinLength, Matches, IsOptional } from 'class-validator';

export class CreateUserDTO {

  @IsString()
  @MinLength(8, { message: 'Password is too short' })
  password: string;

  @IsString()
  @Matches(/@(jhu|jh)\.edu$/, { message: 'Email must end with @jhu.edu or @jh.edu' })
  email: string;

  @IsString()
  firstName: string
  
  @IsString()
  lastName: string

  @IsOptional()
  @IsString()
  avatar: string;
}


