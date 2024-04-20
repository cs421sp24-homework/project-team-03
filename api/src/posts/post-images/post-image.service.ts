import { InjectRepository } from "@nestjs/typeorm";
import { PostImage } from "./post-image.entity";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ImageMetadataDTO } from "./image-metadata.dto";

@Injectable()
export class PostImageService {
  constructor(
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
  ) {}
  async findAll(
    postId: string
  ): Promise<PostImage[]> {
    return this.postImageRepository.find({
      where: {
        postId: postId,
      },
      order: {
        timestamp: "ASC",
      }
    });
  }

  async addBatch(
    newImagesData: ImageMetadataDTO[],
    postId: string
  ): Promise<PostImage[]> {
    return Promise.all(
      newImagesData.map((imgData) => this.add(imgData, postId))
    );
  }

  async add(
    newImageData: ImageMetadataDTO,
    postId: string
  ): Promise<PostImage> {
    const postImage = await this.postImageRepository.create({
      url: newImageData.url,
      path: newImageData.path,
      postId,
    });
    return this.postImageRepository.save(postImage);
  }

  async softDelete(ids: string[]): Promise<UpdateResult> {
    return await this.postImageRepository
      .createQueryBuilder()
      .softDelete()
      .where('id IN (:...ids)', { ids })
      .execute();
  }
}