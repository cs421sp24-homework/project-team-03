export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
};

export type HousingItem = {
  id: string;
  name: string;
  address: string;
  imageURL?: string;
  avgRating: number;
  reviewCount: number;
  distance: number;
  price: string;
};

