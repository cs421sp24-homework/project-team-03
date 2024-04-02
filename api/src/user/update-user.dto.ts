import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  firstName: string
  
  @IsString()
  @IsOptional()
  lastName: string

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsNumber()
  notifications: number;
}


