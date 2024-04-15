import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { favoriteHousing } from './favorite-housing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteHousingService {
  constructor(
    @InjectRepository(favoriteHousing)
    private favoriteHousingRepository: Repository<favoriteHousing>,
  ) {}

  async create(
    housingId: string,
    userId: number,
  ): Promise<favoriteHousing | null> {
    const favorite_housing = await this.favoriteHousingRepository.create({
      housingId,
      userId,
    });

    return this.favoriteHousingRepository.save(favorite_housing);
  }

  async findOne(
    userId: number,
    housingId: string,
  ): Promise<favoriteHousing | null> {
    return this.favoriteHousingRepository.findOne({
      where: {
        userId,
        housingId,
      },
    });
  }

  async remove(
    userId: number,
    housingId: string,
  ): Promise<favoriteHousing | null> {
    const favorite_housing = await this.findOne(userId, housingId);
    if (!favorite_housing) {
      return null;
    }
    return this.favoriteHousingRepository.remove(favorite_housing);
  }

  async findAll(userId: number): Promise<favoriteHousing[] | null> {
    const query = this.favoriteHousingRepository
      .createQueryBuilder('favoriteHousing')
      .where('favoriteHousing.userId = :userId', { userId })

    const favoriteHousings = await query.getMany();

    return favoriteHousings;
  }
}
