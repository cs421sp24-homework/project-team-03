import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostType } from './post.entity';

export class UpdatePostDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNumber()
    cost?: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsOptional()
    @IsString()
    @IsIn(['Roommate', 'Sublet', 'Housing'], { message: 'Invalid post type' })
    type?: PostType;
}
