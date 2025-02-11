'use Client';

import { create } from 'zustand';

type State = {
  itemClicked: boolean;
  setItemClicked: (key: boolean) => void;
}

export const useShopStore = create<State>((set) => ({
  itemClicked: false,
  setItemClicked: (key) => set({ itemClicked: key }),
}))