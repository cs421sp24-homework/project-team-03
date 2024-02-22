import { Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { HousingService } from './housing.service';
import { FindHousingsQueryDTO } from './find-housings-query.dto';
import { FindHousingsResponseDTO } from './find-housings-reponse.dto';
import { HousingResponseDTO } from './housing-reponse.dto';
import { CreateHousingDTO } from './create-housing.dto';

@Controller('housings')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

  @Get()
  async findAll(
    @Query() query: FindHousingsQueryDTO,
  ): Promise<FindHousingsResponseDTO> {
    const { limit, offset, search } = query;

    const housings = await this.housingService.findAll(
      limit,
      offset,
      search,
    );

    return {
      limit,
      offset,
      search,
      data: housings.map((housing) => housing as HousingResponseDTO),
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<HousingResponseDTO> {
    const housing = await this.housingService.findOne(id);

    if (!housing) {
      throw new NotFoundException();
    }

    return housing;
  }

  //TODO: Apply auth guard
  @Post()
  async create(
    @Body() createHousingDTO: CreateHousingDTO,
  ): Promise<HousingResponseDTO> {
    return this.housingService.create(createHousingDTO);
  }
}
