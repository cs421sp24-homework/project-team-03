import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}