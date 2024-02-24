import { Body, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResponseDto } from './post-response.dto';
import { CreatePostDto } from './create-post.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createPostDto: CreatePostDto,
        @UserId() userId: number,
    ): Promise<PostResponseDto> {
        const post = await this.postsService.create(createPostDto, userId);
        delete post.userId;
        return post;
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PostResponseDto> {
        const post = await this.postsService.findOne(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        delete post.userId;
        return post;
    }

    @Get()
    async findAll(): Promise<PostResponseDto[]> {
        const posts = await this.postsService.findAll();
        return posts.map((post) => {
            delete post.userId;
            return post;
        });
    }



}
