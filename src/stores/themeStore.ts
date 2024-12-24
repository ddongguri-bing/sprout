import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDarkMode: boolean;
  setIsDarkMode: (checked: boolean) => void;
}

export const useTheme = create(
  persist<ThemeStore>(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (checked: boolean) => set(() => ({ isDarkMode: checked })),
    }),
    {
      name: "theme-storage",
    }
  )
);
