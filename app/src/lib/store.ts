import { PostWithUserData, Review, ReviewWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { HousingItem } from "./types";

type State = {
  user: User | null;
  housingItems: HousingItem[];
  posts: PostWithUserData[];
  selectedPostId: string | null;
  reviews: ReviewWithUserData[];
  selectedHousingId: string | null;
  // Add more state variables
};

type Action = {
  setUser: (user: User) => void;
  clearUser: () => void;
  setHousingItems: (housingItems: HousingItem[]) => void;
  addHousingItem: (housingItem: HousingItem) => void;
  setPosts: (posts: PostWithUserData[]) => void;
  setSelectedPostId: (id: string) => void;
  clearSelectedPostId: () => void;
  setSelectedHousingId: (id: string) => void;
  clearSelectedHousingId: () => void;
  addPosts: (post: PostWithUserData) => void;
  setEditPosts: (post: PostWithUserData) => void;
  removePost: (id: string) => void;
  setReviews: (reviews: ReviewWithUserData[]) => void;
  addReview: (review: ReviewWithUserData) => void;
  removeReview: (id: string) => void;
  // Add more actions
};

// Define the initial state
const initialState: State = {
  posts: [],
  user: null,
  housingItems: [],
  selectedPostId: null,
  reviews: [],
  selectedHousingId: null,
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    user: (() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    })(),

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },

  clearUser: () => {
    localStorage.removeItem("user"); // Remove user from localStorage
    set({ user: null });
  },
    setHousingItems: (housingItems) => set({ housingItems }),

    addHousingItem: (housingItem) => {
        set({ housingItems: [housingItem, ...get().housingItems] });
    },

  
  setPosts: (posts) => set({ posts }),

  setSelectedPostId: (id) => set({ selectedPostId: id }),

  clearSelectedPostId: () => set({ selectedPostId: null }),

  setSelectedHousingId: (id) => set({ selectedPostId: id }),

  clearSelectedHousingId: () => set({ selectedPostId: null }),

  addPosts: (post) => {
    const newPosts = [...get().posts, post];
    set({ posts: newPosts });
  },

  setEditPosts: (editedPost) => {
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === editedPost.id ? editedPost : post,
      ),
    }));
  },

  removePost: (id) => {
    const newPosts = get().posts.filter((post) => post.id !== id);
    set({ posts: newPosts });
  },

  setReviews: (reviews) => set({ reviews }),
    
  addReview: (review) => {
    const newReviews = [...get().reviews, review];
    set({ reviews: newReviews });
  },

  removeReview: (id) => {
      const newReviews = get().reviews.filter((review) => review.id !== id);
      set({ reviews: newReviews });
  },
})));