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

  async addBatch(
    imgDataArray: ImageMetadataDTO[],
    postId: string
  ) {
    imgDataArray.forEach((imgData) => this.add(imgData, postId));
    return; // TODO: should I return something here??
  }

  async add(
    imgData: ImageMetadataDTO,
    postId: string
  ) {
    const postImage = await this.postImageRepository.create({
      url: imgData.url,
      path: imgData.path,
      postId,
    });
    this.postImageRepository.save(postImage);
    return; // TODO: should I return something here??
  }

  async softDelete() {

  }
}