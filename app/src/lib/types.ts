export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }

  export type PostType = "Roommate" | "Sublet" | "Housing" | null;

  export type Post = {
    id: string;
    title: string;
    content: string;
    timestamp?: string;
    cost: number;
    address: string;
    images?: string; //Make it an array later
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

