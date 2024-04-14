import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { favoriteHousing } from './favorite-housing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteHousingService {
  constructor(
    @InjectRepository(favoriteHousing)
    private favoriteHousingRepostiory: Repository<favoriteHousing>,
  ) {}

  async create(
    housingId: string,
    userId: number,
  ): Promise<favoriteHousing | null> {
    const favorite_housing = await this.favoriteHousingRepostiory.create({
      housingId,
      userId,
    });

    return this.favoriteHousingRepostiory.save(favorite_housing);
  }

  async findOne(
    id: string,
    housingId: string,
  ): Promise<favoriteHousing | null> {
    return this.favoriteHousingRepostiory.findOne({
      where: {
        id,
        housingId,
      },
    });
  }

  async remove(id: string, housingId: string): Promise<favoriteHousing | null> {
    const favorite_housing = await this.findOne(id, housingId);
    if (!favorite_housing) {
      return null;
    }
    return this.favoriteHousingRepostiory.remove(favorite_housing);
  }

  async findAll(userId: number): Promise<favoriteHousing[] | null> {
    const query = this.favoriteHousingRepostiory
      .createQueryBuilder('favoriteHousing')
      .where('favoriteHousing.userId = :userId', { userId })

    const favoriteHousings = await query.getMany();

    return favoriteHousings;
  }

  
}
