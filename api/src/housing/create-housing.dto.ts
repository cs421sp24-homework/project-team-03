import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateHousingDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  distance?: number;

  @IsString()
  @IsOptional()
  price?: string;
}