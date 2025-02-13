import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userData: any;
  setUserData: (data: any) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>()(
  persist<UserState>(
    (set) => ({
      userData: null,
      setUserData: (data) => {
        set({ userData: data });
      },
      clearUserData: () => {
        set({ userData: null });
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
