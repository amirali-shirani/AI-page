import Sidebar from './components/Sidebar/SideBar.jsx';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { useAppStore } from "../store/appStore.js"; // استور اصلی رو ایمپورت کن
import { useMessageStore } from "../store/messageStore.js";

function App() {
    const { chatMessages, setChatMessages } = useMessageStore();
    const { isCollapsed, setIsCollapsed } = useAppStore(); // برای مدیریت Overlay موبایل

    const handleSend = (text) => {
        setChatMessages(prev => [...prev, { text, isUser: true }]);
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                text: `هوش مصنوعی با استفاده از الگوریتم‌های پیشرفته...`,
                isUser: false
            }]);
        }, 1000);
    };

    return (
        <div dir="rtl" className="flex h-[100dvh] overflow-hidden font-sans dark:bg-dark-bg bg-light-bg text-light-text-primary dark:text-dark-text-primary">

            <div className={`
                fixed inset-y-0 right-0 z-50 h-full transition-all duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isCollapsed ? 'w-0' : 'w-72'} /* عرض کانتینر رو هم سینک میکنیم */
            `}>
                <Sidebar />
            </div>
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <main className="flex-1 flex flex-col h-full relative w-full min-w-0">

                <div className="flex-1 overflow-y-auto scroll-smooth w-full">
                    <ChatWindow messages={chatMessages} />
                    <div className="h-32 md:h-40 w-full"></div>
                </div>

                <div className="w-full shrink-0 z-20 bg-white/80 dark:bg-dark-bg/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-safe">
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <MessageInput onSend={handleSend} />
                        {/*<p className="hidden md:block text-center text-[10px] text-gray-400 mt-2 opacity-70">
                            هوش مصنوعی ممکن است اشتباه کند.
                        </p>*/}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;