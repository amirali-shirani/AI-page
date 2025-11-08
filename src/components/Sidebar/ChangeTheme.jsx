import React, { useEffect } from 'react';
import { Moon, Sun } from "lucide-react";
import { useAppStore } from "../../../store/appStore.js";

const ChangeTheme = () => {
    const { isDarkMode, setIsDarkMode } = useAppStore();

    // اضافه یا حذف کلاس dark از body
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
    };

    return (
        <div className={`rounded-xl btn-group flex my-16 bg-gray-300 dark:bg-gray-700 py-1.5 px-1 justify-between mx-12`}>
            <button
                className={`${isDarkMode ? "bg-white text-black" : "bg-transparent text-gray-700"} p-2 rounded-lg`}
                onClick={toggleTheme}
            >
                <span className="flex items-center gap-1">
                    <Moon />
                    Dark
                </span>
            </button>
            <button
                className={`${!isDarkMode ? "bg-white text-black" : "bg-transparent text-gray-700"} p-2 rounded-lg`}
                onClick={toggleTheme}
            >
                <span className="flex items-center gap-1">
                    <Sun />
                    Light
                </span>
            </button>
        </div>
    );
};

export default ChangeTheme;