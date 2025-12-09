import React from 'react';
import {Plus} from "lucide-react"

const NewChatButton = ({onClick}) => {
    return (
        <button
            onClick={onClick}
            className="
    flex items-center gap-3 w-full px-4 py-3
    text-sm font-medium rounded-xl transition-all duration-300
    bg-white/90 text-gray-700 border border-gray-200 shadow-sm
     hover:shadow-lg cursor-pointer
    dark:bg-gray-900/70 dark:text-gray-200 dark:border-gray-700/60
    dark:hover:bg-gray-900  hover:-translate-y-[1px]">
            <Plus size={18} className="text-gray-500 dark:text-gray-400 transition-colors"/>
            <span>چت جدید</span>
        </button>
    );
};

export default NewChatButton;