import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: [];
  likes: [];
  comments: [];
  followers: [];
  following: {
    _id: string;
    user: string;
    follower: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
  notifications: [];
  messages: [];
  _id: string;
  fullName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  __v: number;
}

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
