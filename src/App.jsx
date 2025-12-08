import { useEffect } from "react";
import ChatWindow from "./components/Chat/ChatWindow";
import MessageInput from "./components/Messages/MessageInput.jsx";
import ChatLayout from "./components/Chat/ChatLayout.jsx";
import {useMessageStore} from "../store/messageStore.js";
import {ai} from "../services/api.js";

function App() {
    const setChatMessages = useMessageStore(state => state.setChatMessages);

    useEffect(() => {
        ai.getOrCreateSession();
    }, []);

    const handleSend = (text) => {
        setChatMessages(prev => [...prev, { text, isUser: true }]);

        // Simulation logic
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                text: `پاسخ هوش مصنوعی به: ${text}`,
                isUser: false
            }]);
        }, 600);
    };

    return (
        <ChatLayout>
            <ChatWindow />
            <div className="w-full bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-safe z-20">
                <div className="max-w-4xl mx-auto">
                    <MessageInput onSend={handleSend} />
                </div>
            </div>
        </ChatLayout>
    );
}

export default App;