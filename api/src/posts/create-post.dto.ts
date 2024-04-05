import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PostType } from './post.entity';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({ message: 'Title cannot be empty' })
    title: string;

    @IsString()
    @IsNotEmpty({ message: 'Content cannot be empty' })
    content: string;

    @IsNumber()
    @IsNotEmpty({ message: 'Cost cannot be empty' })
    cost: number;

    @IsString()
    @IsNotEmpty({ message: 'Address cannot be empty' })
    address: string;

    @IsArray()
    @IsString({ each: true })
    images: string[];

    @IsString()
    @IsNotEmpty({ message: 'Type cannot be empty' })
    @IsIn(['Roommate', 'Sublet', 'Housing'], { message: 'Invalid post type' })
    type: PostType;
}
