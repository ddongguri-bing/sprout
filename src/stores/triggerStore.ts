import { create } from "zustand";

interface Trigger {
  trigger: boolean;
  setTrigger: (t?: boolean) => void;
  targetLink: string | null;
  setTargetLink: (link: string | null) => void;
}

export const useTriggerStore = create<Trigger>((set) => ({
  trigger: false,
  setTrigger: (newT) => set((state) => ({ trigger: newT || !state.trigger })),
  targetLink: null,
  setTargetLink: (link) => set({ targetLink: link }),
}));
