import { InjectRepository } from "@nestjs/typeorm";
import { PostImage } from "./post-image.entity";
import { Repository, UpdateResult } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ImageMetadataDTO } from "./image-metadata.dto";
import { Cron } from "@nestjs/schedule";
import { createClient } from "@supabase/supabase-js";

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

  @Cron('0 * * * * *')
  async batchDeleteImagesFromStorage() {
    const SUPABASE_URL = process.env.SUPABASE_STORAGE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_STORAGE_ANON_KEY;    
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    console.log('DELETING EVERYTHING FROM EVERYWHERE FOREVER AND EVER');

    const imagesToRemove = await this.postImageRepository
      .createQueryBuilder('entity')
      .withDeleted() // Include soft deleted rows
      .where('entity.deletedAt IS NOT NULL') // Filter soft deleted rows
      .andWhere('entity.postId IS NULL') // Catch orphaned rows with DeleteDateColumn not set
      .getMany();
    if (imagesToRemove.length === 0) return;

    const pathsToRemove = imagesToRemove.map(imgData => imgData.path);
    const { data, error } = await supabase.storage.from('post-images').remove(pathsToRemove); 
    if ( error ) return; // TODO: handle errors
    if ( data.length !== pathsToRemove.length ) return; // TODO: check returned data array and only remove from DB if deleted successfully
    imagesToRemove.forEach(imgData => console.log(this.postImageRepository.remove( imgData )));
  }
}