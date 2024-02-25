import { PostWithUserData, User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  user: User | null;
  posts: PostWithUserData[];
  selectedPostId: string | null;
  // Add more state variables
};

type Action = {
  setUser: (user: User) => void;
  clearUser: () => void;
  setPosts: (posts: PostWithUserData[]) => void;
  setSelectedPostId: (id: string) => void;
  clearSelectedPostId: () => void;
  // Add more actions
};

// Define the initial state
const initialState: State = {
  posts: [],
  user: null,
  selectedPostId: null,
};

export const useStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,

    setUser: (user) => {
      set({ user });
    },

    clearUser: () => set({ user: null }),

    setPosts: (posts) => set({ posts }),

    setSelectedPostId: (id) => set({ selectedPostId: id }),

    clearSelectedPostId: () => set({ selectedPostId: null }),
  })),

);