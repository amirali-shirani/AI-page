import {useEffect} from "react";
import {aiService} from "../services/api.js";
import {ChatInput, ChatLayout, ChatWindow, useChat} from "./features/chat/index.js";

function App() {

    useEffect(() => {
        aiService.getOrCreateSession().catch((err) => console.error(err));
    }, []);

    const {sendMessage} = useChat();
    return (
        <ChatLayout>
            <ChatWindow/>
            <div
                className="w-full bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-safe z-20">
                <div className="max-w-4xl mx-auto">
                    <ChatInput onSend={sendMessage}/>
                </div>
            </div>
        </ChatLayout>
    );
}

export default App;