import { User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  user: User | null;
  // Add more state variables
};

type Action = {
    setUser: (user: User) => void;
    clearUser: () => void;
  // Add more actions


};

// Define the initial state
const initialState: State = {
  user: null,
};

export const useStore = create<State & Action>()(
  immer((set) => ({
    ...initialState,

    setUser: (user) => {
      set({ user });
    },

    clearUser: () => set({ user: null }),


  })),

);