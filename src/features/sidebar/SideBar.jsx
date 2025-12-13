import { PanelLeftOpen, PanelRightOpen, X } from "lucide-react";
import { useAppStore } from "../../../store/appStore.js";
import NewChatButton from "./components/NewChatButton.jsx";

export default function Sidebar() {
    const isCollapsed = useAppStore(state => state.isCollapsed);
    const setIsCollapsed = useAppStore(state => state.setIsCollapsed);

    return (
        <>
            {!isCollapsed && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsCollapsed(true)}
                />
            )}

            <aside className={`
                fixed inset-y-0 right-0 z-50 h-full bg-sidebar border-l border-gray-300 dark:border-gray-600
                transition-all duration-300 ease-in-out flex flex-col overflow-hidden whitespace-nowrap
                md:relative md:translate-x-0
                ${isCollapsed ? 'w-0 translate-x-full md:translate-x-0 md:w-0 border-none' : 'w-72'}
            `}>
                <div className="relative mt-4 flex items-center justify-between px-3 min-h-[40px]">
                    <div className="flex items-center space-x-2 min-w-0">
                        <span className={`font-bold text-xl bg-clip-text transition-opacity
                        dark:text-gray-200 
                         duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                            Makan System Ai
                        </span>
                    </div>

                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-500 dark:text-gray-400"
                        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <span className="md:hidden"><X className="w-6 h-6"/></span>
                        <span className="hidden md:block">
                             {isCollapsed ? <PanelRightOpen/> : <PanelLeftOpen/>}
                        </span>
                    </button>
                </div>

                <div className="flex-1 mt-6 overflow-y-auto px-2 py-2">
                    <NewChatButton/>
                    {/* ... لیست چت‌ها ... */}
                </div>
            </aside>
        </>
    );
}