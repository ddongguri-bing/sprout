import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Token = null | string;

interface AuthStore {
  isLoggedIn: boolean;
  token: Token;
  user: User | null;
  isSocial: boolean;
  login: (token: Token, user: User, isSocial?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLoggedIn: false,
      token: null,
      user: null,
      isSocial: false,
      login: (token, user, isSocial) =>
        set((state) => ({
          isLoggedIn: true,
          token,
          user,
          isSocial: isSocial || state.isSocial,
        })),
      logout: () =>
        set({ isLoggedIn: false, token: null, user: null, isSocial: false }),
    }),
    {
      name: "food-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional)이기 때문에 해당 줄을 적지 않으면 'localStorage'가 기본 저장소로 사용된다.
    }
  )
);
