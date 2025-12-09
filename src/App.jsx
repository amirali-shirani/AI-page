import {useCallback, useEffect} from "react";
import ChatWindow from "./features/chat/components/ChatWindow.jsx";
import ChatInput from "./features/chat/components/ChatInput.jsx";
import ChatLayout from "./features/chat/ChatLayout.jsx";
import {useMessageStore} from "../store/messageStore.js";
import {ai} from "../services/api.js";

function App() {
    const setChatMessages = useMessageStore(state => state.setChatMessages);
    const chatMessages = useMessageStore(state => state.chatMessages);

    useEffect(() => {
        ai.getOrCreateSession();
    }, []);

    const handleSend = useCallback((text) => {
        setChatMessages(prev => [...prev, { text, isUser: true }]);

        // Simulation logic
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                text: `پاسخ هوش مصنوعی به: ${text}`,
                isUser: false
            }]);
        }, 600);
    },[chatMessages]);

    return (
        <ChatLayout>
            <ChatWindow />
            <div className="w-full bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-safe z-20">
                <div className="max-w-4xl mx-auto">
                    <ChatInput onSend={handleSend} />
                </div>
            </div>
        </ChatLayout>
    );
}

export default App;