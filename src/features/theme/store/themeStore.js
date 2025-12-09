import {create} from 'zustand';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) return JSON.parse(savedTheme);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};


export const useThemeStore = create((set) => ({
    isDarkMode: getInitialTheme(),
    setIsDarkMode: (isDarkMode) => {
        set({isDarkMode});
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    },
}));