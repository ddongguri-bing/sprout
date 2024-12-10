import { create } from "zustand";

interface ThemeType {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
}

export const useTheme = create<ThemeType>((set) => ({
  isDarkMode: false,
  setIsDarkMode: (checked: boolean) => set(() => ({ isDarkMode: checked })),
}));
