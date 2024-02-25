import { User } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { HousingItem } from "./types";
import { create } from "zustand";

type State = {
  user: User | null;
  housingItems: HousingItem[];
  // Add more state variables
};

type Action = {
    setUser: (user: User) => void;
    clearUser: () => void;
    setHousingItems: (housingItems: HousingItem[]) => void;
    addHousingItem: (housingItem: HousingItem) => void;
  // Add more actions
};

// Define the initial state
const initialState: State = {
  user: null,
  housingItems: [],
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setUser: (user) => {
      set({ user });
    },

    clearUser: () => set({ user: null }),

    setHousingItems: (housingItems) => set({ housingItems }),

    addHousingItem: (housingItem) => {
        set({ housingItems: [housingItem, ...get().housingItems] });
    },

  })),

);