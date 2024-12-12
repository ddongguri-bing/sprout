import { create } from "zustand";

export interface User {
  role: string;
  emailVerified: boolean;
  banned: boolean;
  isOnline: boolean;
  posts: [];
  likes: [];
  comments: [];
  followers: [];
  following: [];
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
  login: (token: Token, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  token: null,
  user: null,
  login: (token, user) => set({ isLoggedIn: true, token, user }),
  logout: () => set({ isLoggedIn: false, token: null, user: null }),
}));
