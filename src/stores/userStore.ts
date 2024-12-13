import { create } from "zustand";
import { User } from "./authStore";

interface UserStore {
  onlineUsers: User[];
  setOnlineUsers: (users: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));
