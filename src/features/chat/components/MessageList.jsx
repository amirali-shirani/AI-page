import {useEffect, useRef} from 'react';
import {useChat} from "../hooks/useChat.js";
import Message from "./Message";
import {Loader2} from "lucide-react";
import {useIsMutating} from "@tanstack/react-query";

export default function MessageList() {
    const {messages} = useChat();
    const bottomRef = useRef(null);

    const activeMutations = useIsMutating({
        mutationKey: ['send-chat-message']
    });

    const isTyping = activeMutations > 0;

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }, [messages, isTyping]);

    const msgList = messages?.messages || [];

    return (
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth flex flex-col">

            {msgList.length === 0 ? (
                <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-gray-700
                    dark:text-gray-600 font-bold text-center opacity-50 select-none">
                        چگونه میتوانم به شما کمک کنم؟
                    </h1>
                </div>
            ) : (
                <div className="space-y-6 w-full">
                    {msgList.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`animate-fade-in flex w-full ${msg.isUser ? 'justify-start' : 'justify-end'}`}>
                            <Message message={msg}/>
                        </div>
                    ))}
                </div>
            )}

            {isTyping && (
                <div className="animate-fade-in flex w-full justify-end mt-4">
                    <div
                        className="bg-white dark:bg-gray-800 p-3 px-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-500"/>
                        <span className="text-xs text-gray-500 dark:text-gray-400">در حال نوشتن...</span>
                    </div>
                </div>
            )}

            <div ref={bottomRef} className="h-4"/>
        </div>
    );
}