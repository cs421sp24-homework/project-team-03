export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
    notifications: number,
  }

  export type PostType = "Roommate" | "Sublet" | "Housing" | null;

  export type Post = {
    id: string;
    title: string;
    content: string;
    timestamp?: string;
    cost: number;
    address: string;
    images: string[]; //Make it an array later
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
  url: string;
  path: string;
}