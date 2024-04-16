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
  ) {
    newImagesData.forEach((imgData) => this.add(imgData, postId));
    return; // TODO: should I return something here??
  }

  async add(
    newImageData: ImageMetadataDTO,
    postId: string
  ) {
    const postImage = await this.postImageRepository.create({
      url: newImageData.url,
      path: newImageData.path,
      postId,
    });
    this.postImageRepository.save(postImage);
    return; // TODO: should I return something here??
  }

  async softDelete() {

  }
}