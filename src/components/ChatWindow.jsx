import {useEffect, useRef} from 'react';
import MessageBubble from './MessageBubble';
import Header from "./Header/Header.jsx";

export default function ChatWindow({messages}) {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return (
        <div className={`flex-1 flex flex-col overflow-hidden`}>
            <Header/>
            <div dir="ltr" className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`animate-fade-in ${message.isUser ? 'mr-10 text-right' : 'ml-10 text-left'}`}
                        style={{animationDelay: `${index * 100}ms`}}
                    >
                        <MessageBubble isUser={message.isUser}>
                            {message.text}
                        </MessageBubble>
                    </div>
                ))}
                <div ref={chatEndRef}/>
            </div>
        </div>
    );
}