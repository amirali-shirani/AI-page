import logo from '../../assets/logo.svg';
import {PanelLeftOpen, PanelRightOpen} from "lucide-react"
import {useAppStore} from "../../../store/appStore.js";
import ChangeTheme from "./ChangeTheme.jsx";

export default function Sidebar() {
    const {isCollapsed, setIsCollapsed} = useAppStore();
    return (
        <aside className={`bg-sidebar min-h-screen ${isCollapsed ? "w-0" : "w-72"} border-l flex flex-col justify-between`}>
            <div className={`relative mt-4 flex items-center justify-between px-3 `}>
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="w-8 h-8"/>
                    {!isCollapsed && (
                        <span
                            className="font-bold text-xl bg-clip-text  text-gray-800">
                            Makan
                        </span>
                    )}
                </div>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:scale-105 transition-all 
                    duration-200 ease-in-out ${isCollapsed && "text-gray-200 hover:bg-gray-600"}`}
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}>
                    {isCollapsed ? <PanelLeftOpen/> : <PanelRightOpen/>}
                </button>
            </div>
            <ChangeTheme/>
        </aside>
    );
}


// <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${
//     isCollapsed ? 'w-16' : 'w-64'
// } flex flex-col`}>
//     <div className="p-4 flex items-center justify-between border-b border-gray-800">
//         {!isCollapsed && (
//             <div className="flex items-center space-x-2">
//                 <img src={logo} alt="Logo" className="w-8 h-8"/>
//                 <span
//                     className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//       Makan
//     </span>
//             </div>
//         )}
//         <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
//         >
//             {isCollapsed ? <PanelLeftOpen/> : <PanelRightOpen/>}
//         </button>
//     </div>
//
//     <button
//         className="m-4 bg-purple-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200">
//             <Plus className="text-lg"/>
//         {!isCollapsed && <span>Chat جدید</span>}
//     </button>
//
//     <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1">
//         {[...Array(5)].map((_, i) => (
//             <div
//                 key={i}
//                 className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
//                     i === 0 ? 'bg-gray-800' : ''
//                 }`}
//             >
//                 <SendHorizontal className="text-blue-400 mr-3"/>
//                 {!isCollapsed && (
//                     <span className="truncate">سوال درباره هوش مصنوعی...</span>
//                 )}
//             </div>
//         ))}
//     </div>
//
//     <div className="p-4 border-t border-gray-800 space-y-2">
//         {!isCollapsed && (
//             <div className="mb-3">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="جستجو..."
//                         className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                     {/*<Settings className="absolute left-3 top-3 text-gray-400"/>*/}
//                 </div>
//             </div>
//         )}
//
//         <button
//             className="flex items-center w-full p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
//             <Settings className="text-xl mx-2"/>
//             {!isCollapsed && <span>تنظیمات</span>}
//         </button>
//         <button
//             className="flex items-center w-full p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
//             <LogOut className="text-xl mx-2"/>
//             {!isCollapsed && <span>خروج</span>}
//         </button>
//     </div>
// </div>