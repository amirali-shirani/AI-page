import React, {useEffect} from 'react';
import {Moon, Sun} from 'lucide-react';
import {useThemeStore} from "./store/themeStore.js";

const ChangeTheme = () => {
    const isDarkMode = useThemeStore(state => state.isDarkMode)
    const setIsDarkMode = useThemeStore(state => state.setIsDarkMode)
    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <div className="flex justify-center my-16">
            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`
                    relative w-20 h-10 rounded-full p-1 cursor-pointer transition-colors duration-500 ease-in-out
                    ${isDarkMode ? 'bg-slate-700' : 'bg-sky-200'}`}
                aria-label="Toggle Dark Mode">
                <div
                    className={`
                        w-8 h-8 rounded-full bg-white shadow-lg transform transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
                        flex items-center justify-center ${isDarkMode ? '-translate-x-10' : 'translate-x-0'}`}>
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Sun
                            size={18}
                            className={`absolute text-orange-400 transition-all duration-300
                             ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}/>
                        <Moon
                            size={18}
                            className={`absolute text-slate-800 transition-all duration-300 ${isDarkMode ?
                                'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}/>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default ChangeTheme;