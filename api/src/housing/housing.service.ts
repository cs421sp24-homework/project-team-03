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
    return this.housingRepository.findOne({
      where: { id },
      relations: ['reviews'],
    });
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

  async updateAvgReview(
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
}
