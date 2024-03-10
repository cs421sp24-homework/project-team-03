import { Review } from 'src/reviews/review.entity';

export class HousingResponseDTO {
  id: string;
  name: string;
  address: string;
  imageURL?: string;
  avgRating: number | null;
  distance: number;
  price: string;
  reviewCount: number;

  // NEW
  reviews: Review[];
}
