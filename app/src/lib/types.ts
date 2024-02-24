export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }

  export type PostType = "Roommate" | "Sublet" | "Housing";

  export type Post = {
    id: number;
    title: string;
    content: string;
    cost: number;
    address: string;
    images?: string[];
    userId: number;
    type: PostType;
  }

  export type PostWithUserData = Post & {user?: User};
  