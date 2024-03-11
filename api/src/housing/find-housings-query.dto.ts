import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class FindHousingsQueryDTO {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 50;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @IsString()
  @IsOptional()
  search?: string;
}

export class FindHousingsQueryFilterDTO {
  @IsInt()
  @IsPositive()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit: number = 50;

  @IsInt()
  @Min(0)
  @IsOptional()
  offset: number = 0;

  @IsInt()
  @IsOptional()
  minAvgRating: number = 0;

  @IsInt()
  @IsOptional()
  minReviewCount: number = 0;

  @IsNumber()
  @IsOptional()
  maxDistance: number = 10;

  @IsString()
  @IsOptional()
  maxPrice?: string = '$';
}
