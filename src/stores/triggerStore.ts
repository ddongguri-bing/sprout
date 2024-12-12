import { create } from "zustand";

interface Trigger {
  trigger: boolean;
  setTrigger: (t?: boolean) => void;
}

export const useTriggerStore = create<Trigger>((set) => ({
  trigger: false,
  setTrigger: (newT) => set((state) => ({ trigger: newT || !state.trigger })),
}));
