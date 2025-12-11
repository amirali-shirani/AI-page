import {useEffect, useRef, useState} from 'react';
import {SendHorizontal} from "lucide-react";
import {useChat} from "../hooks/useChat.js";
import RecordingBtn from "./recording/RecordingBtn.jsx";
import SelectCategory from "./SelectCategory.jsx";




export default function MessageInput() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState('');
    const {handleSendMessage} = useChat();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        if (!selectedCategory) {
            alert("لطفا دسته بندی مد نظر خود را انتخاب کنید");
            return;
        }
        handleSendMessage(message, selectedCategory);
        setMessage('');

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-[20px] md:rounded-3xl shadow-sm border
            border-gray-200 dark:border-gray-700 p-1.5 md:p-2 flex items-end gap-2">
            <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2.5 md:p-3 rounded-full transition-all shrink-0 ${
                    message.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transform hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
            >
                <SendHorizontal className="w-5 h-5 md:w-5 md:h-5 rtl:rotate-180"/>
            </button>
            <div className="flex-1 relative bg-transparent min-w-0">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام..."
                    dir="rtl"
                    className="w-full bg-transparent text-gray-800 dark:text-white text-[15px] md:text-base p-2.5 md:p-3
                    focus:outline-none resize-none max-h-[120px] md:max-h-[200px] overflow-y-auto leading-relaxed"
                    rows={1}
                    style={{minHeight: '44px'}}
                />
            </div>

            <div className="flex items-center gap-1 h-11 pb-1">
                <RecordingBtn sendMessage={(txt) => handleSendMessage(txt, selectedCategory)}/>

                <div className="h-5 w-[1px] bg-gray-300 dark:bg-gray-600 mx-1 hidden md:block"></div>
<SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>

            </div>
        </form>
    );
}