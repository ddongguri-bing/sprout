import { create } from "zustand";

interface ThemeStore {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (checked: boolean) => set(() => ({ isDarkMode: checked })),
}));
