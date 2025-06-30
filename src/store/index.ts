import { create } from 'zustand';

interface AppState {
  user: { name: string; id: string } | null;
  setUser: (user: { name: string; id: string } | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
