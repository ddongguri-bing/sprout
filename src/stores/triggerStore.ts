import { create } from "zustand";

interface TriggerStore {
  trigger: boolean;
  setTrigger: (t?: boolean) => void;
  targetLink: string | null;
  setTargetLink: (link: string | null) => void;
}

export const useTriggerStore = create<TriggerStore>((set) => ({
  trigger: false,
  setTrigger: (newT) => set((state) => ({ trigger: newT || !state.trigger })),
  targetLink: null,
  setTargetLink: (link) => set({ targetLink: link }),
}));
