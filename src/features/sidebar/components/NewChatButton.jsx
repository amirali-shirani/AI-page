import React from 'react';
import {Plus} from "lucide-react"
import {useChat} from "../../chat/index.js";

const NewChatButton = () => {
    const {resetSession} = useChat()
    const handleBtn = () => {
        resetSession.mutate()
    }
    return (
        <button
            onClick={handleBtn}
            className="flex items-center gap-3 hover:-translate-y-[1px] transition-all border-gray-400
             border w-full dark:text-gray-200 rounded-lg py-2 px-3 duration-300 cursor-pointer hover:shadow-lg shadow-sm">
            <Plus size={18} className="text-gray-500 dark:text-gray-400 transition-colors"/>
            <span>چت جدید</span>
        </button>
    );
};

export default NewChatButton;