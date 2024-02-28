export type User = {
    id: string;
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
    cost: number;
    address: string;
    images?: string[];
    userId: string;
    type: PostType;
  }

  export type PostWithUserData = Post & {user?: User};

  