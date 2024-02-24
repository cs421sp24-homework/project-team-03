import { Body, Controller, Get, NotFoundException, Param, Patch, Post, UseGuards, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResponseDto } from './post-response.dto';
import { CreatePostDto } from './create-post.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdatePostDto } from './update-post.dto';

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

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
    ): Promise<PostResponseDto> {
        const post = await this.postsService.update(id, updatePostDto);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        delete post.userId;
        return post;
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
    ): Promise<{ statusCode: number; message: string }> {
        const post = await this.postsService.remove(id);
        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return {
            statusCode: 200,
            message: 'Post deleted successfully',
        };
    }




}
