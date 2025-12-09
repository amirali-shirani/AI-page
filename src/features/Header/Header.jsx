import React from 'react';
import { useAppStore } from "../../../store/appStore.js";
import { SlidersHorizontal, Menu } from "lucide-react";
import ChangeTheme from "../theme/ChangeTheme.jsx";

const Header = () => {
    const isCollapsed = useAppStore(state => state.isCollapsed);
    const setIsCollapsed = useAppStore(state => state.setIsCollapsed);
    return (
        <div dir="rtl" className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center
         bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm sticky top-0 z-10 h-16 ">

            <div className="flex items-center gap-3">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer text-gray-600 dark:text-gray-300
                    ${!isCollapsed ? "md:invisible md:w-0 md:p-0 md:overflow-hidden" : "md:visible"} 
                    `}
                >
                    <Menu className="w-6 h-6" />
                </button>

                <h1 className={`text-lg md:text-xl font-bold bg-clip-text 
                    ${!isCollapsed ? "md:opacity-0 transition-opacity duration-300" : "md:opacity-100"}
                `}>
                    Makan System Ai
                </h1>
            </div>

            <div className="flex space-x-2">
                <div className="my-4">
                    <ChangeTheme/>
                </div>
                <button className="hover:scale-105 p-2 rounded-lg cursor-pointer transition-all">
                    <SlidersHorizontal className="text-gray-500"/>
                </button>
            </div>

        </div>
    );
};

export default Header;