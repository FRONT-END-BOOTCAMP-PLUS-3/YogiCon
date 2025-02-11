import { create } from 'zustand';

// ✅ Zustand 스토어 생성
interface UserState {
  userData: any;
  setUserData: (data: any) => void;
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userData: null,
  setUserData: (data) => {
    set({ userData: data });
  },
  clearUserData: () => {
    set({ userData: null });
  },
}));
