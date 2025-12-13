import {useEffect, useRef, useState} from 'react';
import {SendHorizontal , Square} from "lucide-react";
import {useChat} from "../hooks/useChat.js";
import RecordingBtn from "./recording/RecordingBtn.jsx";


export default function MessageInput() {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);
    const {handleSendMessage, isMutating , stopGeneration} = useChat();

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        // if (!selectedCategory) {
        //     alert("لطفا دسته بندی مد نظر خود را انتخاب کنید");
        //     return;
        // }
        handleSendMessage(message);
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
    const handleStop = (e) => {
        e.preventDefault();
        stopGeneration(); // <--- ببین چقدر تمیز شد؟ UI فقط دستور میده.
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-[20px] md:rounded-4xl shadow-sm border
            border-gray-200 dark:border-gray-700 p-2 flex items-end gap-2">

            <button
                type={isMutating ? "button" : "submit"}
                onClick={isMutating ? handleStop : undefined}
                // disabled={!message.trim() && !isMutating} <--- این کامنت درسته، برش ندار

                className={`p-2.5 rounded-full transition-all mb-1.5 ${
                    isMutating
                        ? 'bg-red-500 hover:bg-red-600 text-white shadow-md' // حالت توقف (قرمز)
                        : message.trim()
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transform hover:scale-105' // حالت ارسال (آبی)
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' // حالت غیرفعال (خاکستری)
                }`}// اینجا cursor-not-allowed رو هم برگردون که وقتی واقعا غیرفعاله نشون بده
            >
                {isMutating ? (
                    <Square className="w-3.5 h-3.5 fill-current animate-pulse"/>
                ): (<SendHorizontal className="w-5 h-5 md:w-5 md:h-5 rtl:rotate-180"/> )}
            </button>
            <div className=" bg-transparent w-full">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام..."
                    dir={message.length >= 1 ? "auto" : "rtl"}
                    className="w-full bg-transparent placeholder:text-gray-700 dark:placeholder:text-gray-300 text-gray-800 dark:text-white text-[15px] md:text-base p-2.5 md:p-3
                    focus:outline-none resize-none max-h-[120px] md:max-h-[200px] overflow-y-auto leading-relaxed"
                    rows={1}
                    style={{minHeight: '44px'}}
                />
            </div>

            <div className="flex items-center gap-1 h-11 pb-1 mb-1">
                <RecordingBtn sendMessage={(txt) => handleSendMessage(txt)}/>
                {/*<SelectCategory selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>*/}
            </div>
        </form>
    );
}