import { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble.jsx';
import { useChat } from "../hooks/useChat.js";
import { Loader2 } from "lucide-react";
import {useMessageStore} from "../stores/messageStore.js"; // آیکون لودینگ

export default function ChatWindow() {
    const messages = useMessageStore(state => state.chatMessages);
    const bottomRef = useRef(null);

    // ۱. دریافت وضعیت لودینگ از هوک (مطمئن شو هوک آپدیت شده باشد)
    const { isLoading } = useChat();

    // ۲. اسکرول به پایین هر وقت پیام جدید آمد یا لودینگ شروع/تمام شد
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
            {/* لیست پیام‌های موجود */}
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`animate-fade-in flex w-full ${msg.isUser ? 'justify-start' : 'justify-end'}`}
                >
                    <ChatBubble message={msg} />
                </div>
            ))}

            {/* ۳. نمایش لودینگ (فقط اگر isLoading true باشد) */}
            {isLoading && (
                <div className="animate-fade-in flex w-full justify-end"> {/* سمت چپ (جایگاه ربات) */}
                    <div className="bg-white dark:bg-gray-800 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">در حال نوشتن...</span>
                    </div>
                </div>
            )}

            {/* دیو نامرئی برای اسکرول */}
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}