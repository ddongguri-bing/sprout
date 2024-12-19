import { create } from "zustand";

interface TriggerStore {
  trigger: boolean;
  setTrigger: (t?: boolean) => void;
  targetLink: string | null;
  setTargetLink: (link: string | null) => void;
  isMobile: boolean;
  setIsMobile: (bol: boolean) => void;
}

export const useTriggerStore = create<TriggerStore>((set) => ({
  trigger: false,
  setTrigger: (newT) => set((state) => ({ trigger: newT || !state.trigger })),
  targetLink: null,
  setTargetLink: (link) => set({ targetLink: link }),
  isMobile: false,
  setIsMobile: (bol) => set({ isMobile: bol }),
}));
