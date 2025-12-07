import {PanelLeftOpen, PanelRightOpen, X} from "lucide-react";
import {useAppStore} from "../../../store/appStore.js";
import NewChatButton from "./NewChatButton.jsx";

export default function Sidebar() {
    const isCollapsed = useAppStore(state => state.isCollapsed);
    const setIsCollapsed = useAppStore(state => state.setIsCollapsed);

    return (
        <aside
            className={`bg-sidebar h-full border-gray-300 dark:border-gray-600 border-l flex flex-col justify-between overflow-hidden whitespace-nowrap`}>
            <div className={`relative mt-4 flex items-center justify-between px-3`}>
                <div className="flex items-center space-x-2 min-w-0">
                    {/*<img src={logo} alt="Logo" className="w-8 h-8 shrink-0"/>*/}
                    <span
                        className={`font-bold text-xl bg-clip-text transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                        Makan
                    </span>
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 ease-in-out text-gray-500 dark:text-gray-400`}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                    <span className="md:hidden">
                        <X className="w-6 h-6"/>
                    </span>
                    <span className="hidden md:block">
                         {isCollapsed ? <PanelRightOpen/> : <PanelLeftOpen/>}
                    </span>
                </button>
            </div>
            <div className="flex-1 mt-10 overflow-y-auto py-4 px-2">

                <NewChatButton/>

                {/* ... لیست چت‌ها ... */}
            </div>
        </aside>
    );
}