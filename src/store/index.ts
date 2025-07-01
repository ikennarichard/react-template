import { create } from 'zustand';

type AppState = {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  followedCreators: number[];
  toggleFollow: (creatorId: number) => void;
};

export const useAppStore = create<AppState>((set) => ({
  isAuthenticated: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  followedCreators: [],
  toggleFollow: (creatorId) =>
    set((state) => ({
      followedCreators: state.followedCreators.includes(creatorId)
        ? state.followedCreators.filter((id) => id !== creatorId)
        : [...state.followedCreators, creatorId],
    })),
}));
