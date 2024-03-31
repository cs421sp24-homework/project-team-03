import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Housing } from './housing.entity';
import { Repository } from 'typeorm';
import { CreateHousingDTO } from './create-housing.dto';
import { UpdateHousingDTO } from './update-housing.dto';
import OpenAI from 'openai';

const API_URL = 'http://localhost:3000';
const API_KEY = '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';
const openai = new OpenAI({ apiKey: API_KEY });
// const ENDPOINT_COMPLETIONS = 'https://api.openai.com/v1/chat/completions';

@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private housingRepository: Repository<Housing>,
  ) {}

  async create(createHousingDto: CreateHousingDTO): Promise<Housing> {
    const housing = this.housingRepository.create(createHousingDto);
    return this.housingRepository.save(housing);
  }

  async findAll(
    limit: number,
    offset: number,
    search?: string,
    maxDistance?: number,
    price?: string,
  ): Promise<Housing[]> {
    const queryBuilder = this.housingRepository.createQueryBuilder('housings');

    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy('housings.name', 'ASC');

    let hasWhereCondition = false;

    if (search !== undefined) {
      queryBuilder.where('housings.name ILIKE :search', {
        search: `%${search}%`,
      });
      hasWhereCondition = true;
    }

    // for the max distance
    if (maxDistance !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere('housings.distance <= :maxDistance', {
          maxDistance,
        });
      } else {
        queryBuilder.where('housings.distance <= :maxDistance', {
          maxDistance,
        });
        hasWhereCondition = true;
      }
    }

    if (price !== undefined) {
      if (hasWhereCondition) {
        queryBuilder.andWhere('housings.price <= :price', {
          price,
        });
      } else {
        queryBuilder.where('housings.price <= :price', {
          price,
        });
      }
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Housing | null> {
    return this.housingRepository
      .createQueryBuilder('housing')
      .leftJoinAndSelect('housing.reviews', 'reviews')
      .where('housing.id = :id', { id })
      .getOne();
  }

  async update(
    id: string,
    updateHousingDto: UpdateHousingDTO,
  ): Promise<Housing | null> {
    const housing = await this.housingRepository.preload({
      id,
      ...updateHousingDto,
    });
    if (!housing) {
      return null;
    }
    return this.housingRepository.save(housing);
  }

  async remove(id: string): Promise<Housing | null> {
    const housing = await this.findOne(id);
    if (!housing) {
      return null;
    }
    return this.housingRepository.remove(housing);
  }

  async updateAggregateReviewAfterCreate(
    content: string,
    id: string,
  ): Promise<null> {
    // make sure housing item exists
    const housing = await this.findOne(id);
    if (!housing) {
      return null;
    }

    // get reviews associated with housing
    const response = await fetch(`${API_URL}/housings/${id}/reviews`);
    const responseJson = await response.json();
    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} - ${responseJson.message || response.statusText}`,
      );
    }
    const reviews = responseJson.data;
    console.log('reviews', reviews);

    console.log('num reviews', reviews.length);

    let allReviews = reviews.map((review) => review.content).join(', ');
    // allReviews.push(content);
    allReviews = [allReviews, content];

    console.log('allReviews', allReviews.length);

    allReviews.forEach((review) => {
      console.log(review);
    });

    // api request body along with response
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant who writes a concise and meaningful aggregate review of an apartment. Do not refer to past message history by the user when formulating the paragraph. Write the paragraph as if you have not seen these reviews before.',
        },
        {
          role: 'user',
          content: `Summarize these reviews into a meaningful and clear paragraph of around 30 words. Do not refer to past message history by the user when formulating the paragraph. Write the paragraph as if you have not seen these reviews before. ${allReviews}`,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    // throw an error if api response is null
    if (!completion) {
      throw new Error('Failed to fetch data from API');
    }

    console.log(completion.choices[0].message.content);
    housing.aggregateReview = completion.choices[0].message.content;
    await this.housingRepository.save(housing);
  }

  async updateAvgReviewAfterCreate(
    newRating: number,
    id: string,
  ): Promise<Housing | null> {
    const housing = await this.findOne(id);
    if (!housing) {
      return null;
    }

    let reviewSum = 0;
    if (newRating > -1) {
      reviewSum = housing.avgRating * housing.reviewCount;
    }

    reviewSum = reviewSum + newRating;
    housing.reviewCount = housing.reviewCount + 1;
    housing.avgRating = reviewSum / housing.reviewCount;
    await this.housingRepository.save(housing);
    return housing;
  }

  async updateAvgReviewAfterDelete(
    deletedRating: number,
    id: string,
  ): Promise<Housing | null> {
    const housing = await this.findOne(id);
    if (!housing) {
      return null;
    }

    let reviewSum = housing.avgRating * housing.reviewCount;

    reviewSum = reviewSum - deletedRating;
    housing.reviewCount = housing.reviewCount - 1;

    if (housing.reviewCount > 0) {
      housing.avgRating = reviewSum / housing.reviewCount;
    } else {
      housing.avgRating = 0; // Set to a default value, like 0, when there are no reviews
    }
    await this.housingRepository.save(housing);
    return housing;
  }
}
