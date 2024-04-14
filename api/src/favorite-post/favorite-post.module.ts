import { Module } from '@nestjs/common';
import { FavoritePostService } from './favorite-post.service';
import { FavoritePostController } from './favorite-post.controller';
import { favoritePost } from './favorite-post.entity';
import { User } from 'src/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([favoritePost, User])],
  providers: [FavoritePostService, UserService],
  controllers: [FavoritePostController],
})
export class FavoritePostModule {}
