import { create } from 'zustand';

export const usePortalStore = create((set) => ({
  activePortalId: null,
  setActivePortal: (id) => set({ activePortalId: id }),
}));

export const useScrollStore = create((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
