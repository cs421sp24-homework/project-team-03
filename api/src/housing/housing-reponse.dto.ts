export class HousingResponseDTO {
  id: string;
  name: string;
  address: string;
  imageURL?: string;
  rating: number | null;
  reviewCount: number;
}