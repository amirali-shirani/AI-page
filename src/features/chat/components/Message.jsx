import { FileText } from "lucide-react";
export default function Message({message}) {
    const {text, isUser , sources} = message;
    const bubbleClass = `
        max-w-[85%] md:max-w-[70%] lg:max-w-2xl 
        p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
        whitespace-pre-wrap
        ${isUser
        ? 'bg-light-accent dark:bg-dark-accent text-white rounded-br-none'
        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'}
    `;
    return (
        <>
            <div className={bubbleClass} dir="auto">
                {text}
            </div>
            {!isUser && sources && (
                <div className="mt-4 pt-3 border-t border-border/50">
                    <p className="text-xs font-bold text-text-muted mb-2 flex items-center gap-1">
                        <FileText size={14}/>
                        منابع استفاده شده:
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {sources.map((source, index) => (
                            <div
                                key={index}
                                className="bg-background/50 hover:bg-background border border-border rounded-lg p-2 text-xs transition-colors cursor-help group relative"
                                title={`امتیاز شباهت: ${Math.round(source.score * 100)}%`}
                            >
                                <span className="text-primary font-medium block truncate max-w-[200px]">
                                    {source.label}
                                </span>

                                <div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white p-2 rounded shadow-xl text-[10px] hidden group-hover:block z-10 pointer-events-none">
                                    {source.snippet.substring(0, 150)}...
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}