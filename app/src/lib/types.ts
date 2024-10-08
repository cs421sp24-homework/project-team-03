export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  bio?: string;
  notifications: number,
  reviews?: ReviewWithUserData[]
  age?: string,
  gender?: string,
  major?: string,
  gradYear?: string,
  stayLength?: string,
  budget?: string,
  idealDistance?: string,
  petPreference?: string,
  cleanliness?: string,
  smoker?: string,
  socialPreference?: string,
  peakProductivity?: string,
}

export type PostType = "Roommate" | "Sublet" | "Housing" | null;

export type Post = {
  id: string;
  title: string;
  content: string;
  timestamp?: string;
  cost: number;
  address: string;
  // images: string[]; //Make it an array later
  images: ImageMetadata[];
  userId: number;
  type: PostType;
  latitude?: number;
  longitude?: number;
}

export type PostWithUserData = Post & {user?: User};


export type HousingItem = {
  id: string;
  name: string;
  address: string;
  imageURL: string;
  avgRating: number;
  reviewCount: number;
  distance: number;
  price: string;
  latitude?: number;
  longitude?: number;
  aggregateReview: string;
};

export type ReviewWithUserData = Review & {user: User};

export type Review = {
  id: string;
  content: string;
  timestamp: string;
  rating: number;
  upvoteCount: number;
  housingId: string;
};

export type Like = {
  id: string;
  reviewId: string;
  userId: string;
};

export type ImageMetadata = {
  id?: string;  // no id field before uploading
  url: string;
  path: string;
}

export type Locations = {
  displayName: string;
  formattedAddress: string;
  latitude?: number;
  longitude?: number;
  distance: number;
  rating: number;
}

export type GooglePlacesAPIResponse = {
  places: {
    formattedAddress: string;
    rating: number;
    displayName: {text:string};
    location: {
        latitude: number;
        longitude: number;
    };
  }
};