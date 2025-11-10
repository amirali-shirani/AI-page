// store/appStore.js
import { create } from 'zustand';

// تابعی برای تشخیص تم پیش‌فرض
const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
        return JSON.parse(savedTheme);
    }
    // گزینه اختیاری: تشخیص بر اساس تنظیمات سیستم
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const useAppStore = create((set) => ({
    isDarkMode: getInitialTheme(),
    isCollapsed: false, // یا مقدار پیش‌فرض شما
    setIsDarkMode: (isDarkMode) => {
        set({ isDarkMode });
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
    },
    // سایر متغیرها و توابع شما
}));