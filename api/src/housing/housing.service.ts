import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Housing } from './housing.entity';
import { Repository } from 'typeorm';
import { CreateHousingDTO } from './create-housing.dto';
import { UpdateHousingDTO } from './update-housing.dto';

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

  async findAllWithFilters(
    limit?: number | null,
    offset?: number | null,
    minAvgRating?: number | null,
    minReviewCount?: number | null,
    maxDistance?: number | null,
    maxPrice?: string | null,
  ): Promise<Housing[]> {
    const queryBuilder = this.housingRepository.createQueryBuilder('housings');

    const priceLevels = {
      $: 1,
      $$: 2,
      $$$: 3,
    };

    if (limit !== undefined && limit !== null) {
      queryBuilder.limit(limit);
    }

    if (offset !== undefined && offset !== null) {
      queryBuilder.offset(offset);
    }

    queryBuilder.orderBy('housings.name', 'ASC');

    if (minAvgRating !== undefined && minAvgRating !== null) {
      queryBuilder.andWhere('housings.avgRating >= :minAvgRating', {
        minAvgRating,
      });
    }

    if (minReviewCount !== undefined && minReviewCount !== null) {
      queryBuilder.andWhere('housings.reviewCount >= :minReviewCount', {
        minReviewCount,
      });
    }

    if (maxDistance !== undefined && maxDistance !== null) {
      queryBuilder.andWhere('housings.distance <= :maxDistance', {
        maxDistance,
      });
    }

    if (maxPrice !== undefined && maxPrice !== null) {
      const priceLevel = priceLevels[maxPrice];
      if (priceLevel !== undefined) {
        queryBuilder.andWhere('LENGTH(housings.price) <= :priceLevel', {
          priceLevel,
        });
      }
    }

    return queryBuilder.getMany();
  }

  async findAll(
    limit: number,
    offset: number,
    search?: string,
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

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Housing | null> {
    return this.housingRepository.findOne({ where: { id } });
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
}
