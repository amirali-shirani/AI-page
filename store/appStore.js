import { create } from 'zustand';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) return JSON.parse(savedTheme);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const getInitialSidebarState = () => {
    const savedState = localStorage.getItem('isCollapsed');
    return savedState ? JSON.parse(savedState) : false;
};

export const useAppStore = create((set) => ({
    isDarkMode: getInitialTheme(),
    isCollapsed: getInitialSidebarState(),

    setIsDarkMode: (isDarkMode) => {
        set({ isDarkMode });
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    },

    setIsCollapsed: () => set((state) => {
        const newState = !state.isCollapsed;
        localStorage.setItem('isCollapsed', JSON.stringify(newState)); // ذخیره وضعیت جدید
        return { isCollapsed: newState };
    }),
}));