import Sidebar from './components/Sidebar/SideBar.jsx';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { useMessageStore } from "../store/messageStore.js";

function App() {
    const { chatMessages, setChatMessages } = useMessageStore();

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
        <div dir="rtl" className="flex h-screen overflow-hidden font-sans dark:bg-dark-bg bg-light-bg text-light-text-primary dark:text-dark-text-primary">
            <Sidebar />

            {/* کانتینر اصلی که کل صفحه سمت چپ رو میگیره */}
            <main className="flex-1 flex flex-col relative h-full">

                {/* ۱. فضای چت:
                   کل فضا رو پر میکنه (inset-0) و اسکرول میشه.
                */}
                <div className="flex-1 overflow-y-auto scroll-smooth">
                    <ChatWindow messages={chatMessages} />

                    {/* ۲. فضای خالی انتهای چت (Spacer):
                       این خیلی مهمه! باعث میشه آخرین پیام بره بالا و زیر اینپوت قایم نشه.
                    */}
                    <div className="h-32 md:h-40 w-full"></div>
                </div>

                {/* ۳. کانتینر اینپوت شناور:
                   چسبیده به پایین (bottom-0)، روی چت (z-10) و با پس‌زمینه گرادینت
                */}
                <div className="absolute bottom-0 left-0 right-0 w-full z-10 px-4 pb-6 pt-10 bg-gradient-to-t from-light-bg via-light-bg to-transparent dark:from-dark-bg dark:via-dark-bg">
                    <div className="max-w-4xl mx-auto">
                        <MessageInput onSend={handleSend} />

                        {/* متن کپی‌رایت یا هشدار ریز پایین اینپوت */}
                        <p className="text-center text-xs text-gray-400 mt-3 opacity-70">
                            هوش مصنوعی ممکن است اشتباه کند. لطفاً اطلاعات مهم را بررسی کنید.
                        </p>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default App;