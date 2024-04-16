import { InjectRepository } from "@nestjs/typeorm";
import { PostImage } from "./post-image.entity";
import { Repository } from "typeorm";
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
    // TODO: Get all images with postId 

    // TODO: filter out 'soft-deleted' images

    return;
  }

  async addBatch(
    newImagesData: ImageMetadataDTO[],
    postId: string
  ): Promise<PostImage[]> {
    // return newImagesData.map((imgData) => this.add(imgData, postId));
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

  async softDelete() {

  }
}