import { useState, useRef, useEffect } from 'react';
import { Mic, Paperclip, SendHorizontal } from "lucide-react";

export default function MessageInput({ onSend }) {
    const [message, setMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const textareaRef = useRef(null); // 1. رففرنس به تکست‌اریا

    // 2. لاجیک تغییر ارتفاع خودکار
    useEffect(() => {
        if (textareaRef.current) {
            // اول ارتفاع رو ریست میکنیم تا اگر متن کم شد، باکس کوچک شود
            textareaRef.current.style.height = 'auto';
            // حالا ارتفاع رو برابر با محتوای اسکرول تنظیم میکنیم
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    const handleSubmit = (e) => {
        e?.preventDefault(); // هندل کردن ایونت اختیاری
        if (message.trim()) {
            onSend(message);
            setMessage('');
            // بعد از ارسال، ارتفاع رو دستی ریست میکنیم
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // جلوگیری از رفتن به خط بعد
            handleSubmit();
        }
    };

    const startRecording = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            onSend("این یک پیام صوتی تست است");
        }, 2000);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-2 flex items-end gap-2"
        >
            {/* دکمه ضبط */}
            <button
                type="button"
                onClick={startRecording}
                className={`p-3 rounded-full transition-all shrink-0 ${
                    isRecording
                        ? 'bg-red-500 text-white animate-pulse'
                        : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
                {isRecording ? (
                    <div className="w-2.5 h-2.5 bg-white rounded-full mx-auto"/>
                ) : (
                    <Mic className="w-6 h-6"/>
                )}
            </button>

            {/* کانتینر ورودی */}
            <div className="flex-1 relative bg-transparent">
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="پیام خود را بنویسید..."
                    dir="auto"
                    className="w-full bg-transparent text-gray-800 dark:text-white text-base p-3 pl-10
                    focus:outline-none resize-none max-h-[200px] overflow-y-auto"
                    rows={1}
                    style={{ minHeight: '48px' }} // ارتفاع اولیه مناسب
                />

                {/* دکمه اتچمنت - سمت چپ */}
                {/*<button*/}
                {/*    type="button"*/}
                {/*    className="absolute left-2 bottom-2.5 p-1 text-gray-400 hover:text-blue-500 transition-colors">*/}
                {/*    <Paperclip className="w-5 h-5"/>*/}
                {/*</button>*/}
            </div>

            {/* دکمه ارسال */}
            <button
                type="submit"
                disabled={!message.trim()}
                className={`p-3 rounded-full transition-all shrink-0 ${
                    message.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md transform hover:scale-105'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
                <SendHorizontal className="w-5 h-5 rtl:rotate-180"/> {/* چرخش آیکون در حالت فارسی */}
            </button>
        </form>
    );
}