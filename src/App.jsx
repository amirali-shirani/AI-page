import Sidebar from './components/Sidebar/SideBar.jsx';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import {useMessageStore} from "../store/messageStore.js";

function App() {
    const {chatMessages, setChatMessages} = useMessageStore()
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
        <div dir="rtl"
             className="flex h-screen  font-sans dark:bg-dark-bg bg-light-bg text-light-text-primary dark:text-dark-text-primary">
            <Sidebar/>
            <div className="flex flex-col flex-1">
                <ChatWindow messages={useMessageStore().chatMessages}/>
                <MessageInput onSend={handleSend}/>
            </div>
        </div>
    );
}

export default App;