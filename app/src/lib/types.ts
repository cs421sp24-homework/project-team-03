export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  }
  
export type Post = {	
  id: string;
  title: string;
  cost: number;
  address: string;
  content: string;
  createdAt: string;
  // Optional because if you're 'looking for a roommate' or
  // 'looking for housing', you wouldn't have pictures (most likely)
  images?: string[];
  user: string;
  userId: string;
  type: PostType;
}

// Defines a post type as one of the 3 options
export type PostType = 'looking for a roommate' | 'looking for a subletter' | 'looking for housing';

export type PostWithUserData = Post & { user?: User };