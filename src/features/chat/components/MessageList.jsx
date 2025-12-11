import { useEffect, useRef } from 'react';
import { useChat } from "../hooks/useChat.js";
import Message from "./Message";
import { Loader2 } from "lucide-react";
import { useIsMutating } from "@tanstack/react-query";

export default function MessageList() {
    const { messages } = useChat();
    const bottomRef = useRef(null);

    const activeMutations = useIsMutating({
        mutationKey: ['send-chat-message']
    });

    const isTyping = activeMutations > 0;

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const msgList = messages?.messages || [];

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
            {msgList.length === 0 ? (
                <h1 className="text-5xl h-[70vh] justify-center flex items-center text-gray-400">
                    چگونه میتوانم به شما کمک کنم؟
                </h1>
            ) : (
                msgList.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`animate-fade-in flex w-full ${msg.isUser ? 'justify-start' : 'justify-end'}`}>
                        <Message message={msg}/>
                    </div>
                ))
            )}

            {isTyping && (
                <div className="animate-fade-in flex w-full justify-end">
                    <div className="bg-white dark:bg-gray-800 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-500"/> {/* سایز لودر رو منطقی‌تر کردم */}
                        <span className="text-xs text-gray-500 dark:text-gray-400">در حال نوشتن...</span>
                    </div>
                </div>
            )}

            <div ref={bottomRef} className="h-4"/>
        </div>
    );
}