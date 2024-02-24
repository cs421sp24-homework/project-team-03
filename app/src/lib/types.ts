// data set needs to include distance, price
// compare with Housing entity in backend
// modify DTOs so fields are consistent

export type HousingItem = {
    id: string;
    name: string;
    address: string;
    imageURL?: string;
    avgRating: number;
    reviewCount: number;
    distance: number;
    price: string;
}


