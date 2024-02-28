export type User = {
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }

  export type PostType = "Roommate" | "Sublet" | "Housing";

  export type Post = {
    id: string;
    title: string;
    content: string;
    cost: number;
    address: string;
    images?: string[];
    userId: number;
    type: PostType;
  }

  export type PostWithUserData = Post & {user?: User};


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

