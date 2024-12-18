import { create } from "zustand";

interface UserStore {
  onlineUsers: User[];
  setOnlineUsers: (users: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  onlineUsers: [],
  setOnlineUsers: (users) => set({ onlineUsers: users }),
}));
