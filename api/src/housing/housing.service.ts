import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Housing } from './housing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HousingService {
  constructor(
    @InjectRepository(Housing)
    private housingRepository: Repository<Housing>,
  ) {}
  async findAll(
    limit: number,
    offset: number,
    search?: string,
  ): Promise<Housing[]> {
    const queryBuilder = this.housingRepository.createQueryBuilder('housings');
    
    queryBuilder.limit(limit);
    queryBuilder.offset(offset);
    queryBuilder.orderBy("housings.name", "ASC");

    let hasWhereCondition = false;

    if (search !== undefined) {
      queryBuilder.where("housings.name ILIKE :search", {
        search: `%${search}%`
      });
      hasWhereCondition = true;
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Housing | null> {
    return this.housingRepository.findOne({ where: {id}, });
  }
}
