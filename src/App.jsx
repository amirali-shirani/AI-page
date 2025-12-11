import {useEffect} from "react";
import {MessageInput, MessageList} from "./features/chat/index.js";
import {chatServices} from "./features/chat/api/chatServices.js";
import Sidebar from "./features/sidebar/SideBar.jsx";
import Header from "./features/header/Header.jsx";

function App() {
    useEffect(() => {
        chatServices.getOrCreateSession().catch((err) => console.error(err));
    }, []);

    return (
        <div
            className="flex h-[100dvh] overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text-primary
            dark:text-dark-text-primary" dir="rtl">
            <Sidebar/>
            <div className="flex-1 flex flex-col h-full min-w-0 relative">
                <Header/>
                <main className="flex-1 flex flex-col overflow-hidden relative">
                    <div className="flex-1 w-full overflow-y-auto flex flex-col scroll-smooth">
                        <div className="flex-1 w-full max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col">
                            <MessageList/>
                        </div>
                    </div>

                    <div
                        className="w-full bg-white/80 dark:bg-dark-bg/90 p-4">
                        <div className="max-w-2xl md:max-w-3xl lg:max-w-5xl mx-auto">
                            <MessageInput/>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default App;