import { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble.jsx';
import {useMessageStore} from "../../../../store/messageStore.js";

export default function ChatWindow() {
    const messages =    useMessageStore(state => state.chatMessages);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`animate-fade-in flex w-full ${msg.isUser ? 'justify-start' : 'justify-end'}`}
                >
                    <ChatBubble message={msg} />
                </div>
            ))}
            <div ref={bottomRef} className="h-4" />
        </div>
    );
}