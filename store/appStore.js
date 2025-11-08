import {create} from "zustand"

export const useAppStore = create((set) => ({
    isCollapsed: true,
    setIsCollapsed: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

    isDarkMode: false,
    setIsDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}))