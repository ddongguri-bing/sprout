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
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
