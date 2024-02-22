import { HousingResponseDTO } from "./housing-reponse.dto";

export class FindHousingsResponseDTO {
  limit: number;
  offset: number;
  search?: string;
  data: HousingResponseDTO[];
}