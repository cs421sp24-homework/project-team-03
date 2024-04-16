import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  Delete,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostResponseDto } from './post-response.dto';
import { CreatePostDto } from './create-post.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdatePostDto } from './update-post.dto';
import { PostOwnershipGuard } from 'src/guards/post-owner.guard';
import { UserService } from 'src/user/user.service';
import { PostType } from './post.entity';
import { PostImageService } from './post-images/post-image.service';

type PostResponseWithPagination = {
  filter?: string;
  search?: string;
  data: PostResponseDto[];
  pagination: {
    limit: number;
    offset: number;
  };
};

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UserService,
    private postImageService: PostImageService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @UserId() userId: number,
  ): Promise<PostResponseDto> {
    const post = await this.postsService.create(createPostDto, userId);
    delete post.userId;
    if (createPostDto.imagesData.length > 0) {
      post.images = await this.postImageService.addBatch(createPostDto.imagesData, post.id);
    }
    // console.log('images', post.images);
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
  async findAll(
    @Query('limit', new DefaultValuePipe(10)) limit: number,
    @Query('offset', new DefaultValuePipe(0)) offset: number,
    @Query('search') search: string,
    @Query('email') email?: string,
    @Query('withUserData') withUserData?: boolean,
    @Query('type') type?: PostType,
    @Query('cost', new DefaultValuePipe(10000)) cost?: number,
  ): Promise<PostResponseWithPagination> {
    let userId: number | undefined;

    if (email) {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
      }
      userId = user.id;
    }

    const posts = await this.postsService.findAll(
      limit,
      offset,
      search,
      userId,
      withUserData,
      type,
      cost,
    );
    // console.log(posts);
    return {
      filter: email,
      search,
      pagination: {
        limit,
        offset,
      },

      data: posts.map((post) => {
        delete post.userId;
        if (post.user) {
          delete post.user.password;
          // TODO: delete verification token and other unnecessary fields?
        }
        // Delete path (data minimization?)
        // post.images?.forEach((img) => {
        //   delete img.path;
        // })
        return post;
      }),
    };
  }

  // @UseGuards(JwtAuthGuard, PostOwnershipGuard)
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updatePostDto: UpdatePostDto,
  // ): Promise<PostResponseDto> {
  //   // TODO: logic for deleting images and adding new images (Image entity and mark for Supabase batch delete"
  //   const post = await this.postsService.update(id, updatePostDto);
  //   if (!post) {
  //     throw new NotFoundException(`Post with ID ${id} not found`);
  //   }
  //   delete post.userId;
  //   return post;
  // }

  @UseGuards(JwtAuthGuard, PostOwnershipGuard)
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
