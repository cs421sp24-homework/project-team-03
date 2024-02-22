import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { HousingService } from './housing.service';
import { FindHousingsQueryDTO } from './find-housings-query.dto';
import { FindHousingsResponseDTO } from './find-housings-reponse.dto';
import { HousingResponseDTO } from './housing-reponse.dto';
import { CreateHousingDTO } from './create-housing.dto';
import { UpdateHousingDTO } from './update-housing.dto';

@Controller('housings')
export class HousingController {
  constructor(private readonly housingService: HousingService) {}

  /**
   * Create a new housing item
   * @param createHousingDTO 
   * @returns 
   */
  // TODO: Apply auth guard
  @Post()
  async create(
    @Body() createHousingDTO: CreateHousingDTO,
  ): Promise<HousingResponseDTO> {
    return this.housingService.create(createHousingDTO);
  }

  /**
   * Get all housing items in database
   * @param query 
   * @returns 
   */
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

  /**
   * 
   * @param id 
   * @returns 
   */
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

  /**
   * 
   * @param id 
   * @param updateHousingDto 
   * @returns 
   */
  //TODO: Apply auth guard
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHousingDto: UpdateHousingDTO,
  ): Promise<HousingResponseDTO> {
      const housing = await this.housingService.update(id, updateHousingDto);
      if (!housing) {
        throw new NotFoundException();
      }
      return housing;
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  //TODO: Apply auth guard
  @Delete(':id')
  async remove(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
      const housing = await this.housingService.remove(id);
      if (!housing) {
        throw new NotFoundException();
      }
      return {
        statusCode: 200,
        message: "Housing deleted successfully",
      }
  }
}
