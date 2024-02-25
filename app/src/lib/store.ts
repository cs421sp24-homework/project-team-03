import { PostWithUserData, User } from "./types";
import { create } from "zustand";

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
  addPosts: (post: PostWithUserData) => void;
  setEditPosts: (post: PostWithUserData) => void;
  removePost: (id: string) => void;
  // Add more actions
};

// Define the initial state
const initialState: State = {
  posts: [],
  user: null,
  selectedPostId: null,
};

export const useStore = create<State & Action>((set, get) => ({
  ...initialState,

  setUser: (user) => {
    set({ user });
  },

  clearUser: () => set({ user: null }),

  setPosts: (posts) => set({ posts }),

  setSelectedPostId: (id) => set({ selectedPostId: id }),

  clearSelectedPostId: () => set({ selectedPostId: null }),

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
}));