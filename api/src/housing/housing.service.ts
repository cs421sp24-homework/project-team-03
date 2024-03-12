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
    housing.avgRating = reviewSum / housing.reviewCount;
    await this.housingRepository.save(housing);
    return housing;
  }
}
