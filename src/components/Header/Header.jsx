import React from 'react';
import {useAppStore} from "../../../store/appStore.js";
import {SlidersHorizontal} from "lucide-react"

const Header = () => {
    const {isCollapsed} = useAppStore()
    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h1 className={`text-xl font-bold bg-clip-text text-transparent bg-user-chat ${isCollapsed && "mx-12"}`}>
                Makan System Ai
            </h1>

            <div className="flex space-x-2 ">

                <button
                    className="hover:scale-105 hover:bg-gray-200 p-2 rounded-lg cursor-pointer transition-all duration-200">
                    <SlidersHorizontal/>
                </button>
            </div>

        </div>
    );
};

export default Header;