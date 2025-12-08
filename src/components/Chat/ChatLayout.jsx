import {useAppStore} from "../../../store/appStore.js";
import Sidebar from "../Sidebar/SideBar.jsx";
import Header from "../Header/Header.jsx";

export default function ChatLayout({children}) {
    const isCollapsed = useAppStore(state => state.isCollapsed);
    const setIsCollapsed = useAppStore(state => state.setIsCollapsed);
    return (
        <div
            className="flex h-[100dvh] overflow-hidden bg-light-bg dark:bg-dark-bg text-light-text-primary dark:text-dark-text-primary"
            dir="rtl">
            <aside className={`
                fixed inset-y-0 right-0 z-50 h-full transition-all duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800
                md:relative md:translate-x-0
                ${isCollapsed ? 'w-0 translate-x-full md:translate-x-0 md:w-0' : 'w-72'}
            `}>
                <Sidebar/>
            </aside>

            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <main className="flex-1 flex flex-col h-full min-w-0 relative">
                <Header/>
                <div className="flex-1 flex flex-col overflow-hidden relative">
                    {children}
                </div>
            </main>
        </div>
    );
}