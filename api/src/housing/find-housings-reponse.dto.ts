import { HousingResponseDTO } from "./housing-reponse.dto";

export class FindHousingsResponseDTO {
  limit: number;
  offset: number;
  search?: string;
  data: HousingResponseDTO[];
}

export class FindHousingsFilteredResponseDTO {
  limit: number;
  offset: number;
  minAvgRating?: number;
  minReviewCount?: number;
  maxDistance?: number;
  maxPrice?: string;
  data: HousingResponseDTO[];
}