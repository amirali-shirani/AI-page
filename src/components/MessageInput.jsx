import {useEffect, useRef, useState} from 'react';
import {Mic, SendHorizontal} from "lucide-react";

export default function MessageInput({onSend}) {
    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`; // محدود کردن ارتفاع ماکسیمم
        }
    }, [message]);

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (message.trim()) {
            onSend(message);
            setMessage('');
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            onSend("پیام صوتی تست");
        }, 2000);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-[20px] md:rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 p-1.5 md:p-2 flex items-end gap-2"
        >
            <button
                type="button"
                onClick={startRecording}
                className={`p-2.5 md:p-3 rounded-full transition-all shrink-0 ${
                    isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                {isRecording ? (
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full mx-auto"/>
                ) : (
                    <Mic className="w-5 h-5 md:w-6 md:h-6"/>
                )}
            </button>

            <div className="flex-1 relative bg-transparent min-w-0">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام..."
                    dir="auto"
                    className="w-full bg-transparent text-gray-800 dark:text-white text-[15px] md:text-base p-2.5 md:p-3
                    focus:outline-none resize-none max-h-[120px] md:max-h-[200px] overflow-y-auto leading-relaxed"
                    rows={1}
                    style={{minHeight: '44px'}}
                />
            </div>

            <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2.5 md:p-3 rounded-full transition-all shrink-0 ${
                    message.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transform hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
                <SendHorizontal className="w-5 h-5 md:w-5 md:h-5 rtl:rotate-180"/>
            </button>
        </form>
    );
}