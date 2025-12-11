import {useEffect} from "react";
import {ChatLayout, MessageInput, MessageList} from "./features/chat/index.js";
import {chatServices} from "./features/chat/api/chatServices.js";

function App() {

    useEffect(() => {
        chatServices.getOrCreateSession().catch((err) => console.error(err));
    }, []);

    return (
        <ChatLayout>
            <MessageList/>
            <div
                className="w-full bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 p-4 pb-safe z-20">
                <div className="max-w-4xl mx-auto">
                    <MessageInput/>
                </div>
            </div>
        </ChatLayout>
    );
}

export default App;