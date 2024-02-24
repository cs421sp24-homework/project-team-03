import { HousingItem } from "./types";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  housingItems: HousingItem[];
};

type Action = {
  setHousingItems: (housingItems: HousingItem[]) => void;
  addHousingItem: (housingItem: HousingItem) => void;
  // Add more actions
};

// define the initial state
const initialState: State = {
  housingItems: [],
};

export const useStore = create<State & Action>()(
  immer((set, get) => ({
    ...initialState,

    setHousingItems: (housingItems) => set({ housingItems }),

    addHousingItem: (housingItem) => {
        set({ housingItems: [housingItem, ...get().housingItems] });
    },

  }))
);
