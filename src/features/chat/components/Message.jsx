import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // <--- این خیلی مهمه

export default function Message({ message }) {
    const { text, isUser } = message;

    const baseBubbleClass = `
        max-w-[85%] md:max-w-[70%] lg:max-w-2xl 
        p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
        overflow-x-auto 
    `;
    // نکته: overflow-x-auto رو اضافه کردم که اگه جدول بزرگ بود، اسکرول بخوره و صفحه رو خراب نکنه

    const styleClass = isUser
        ? 'bg-light-accent dark:bg-dark-accent text-white rounded-br-none prose prose-invert'
        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700 prose dark:prose-invert';

    return (
        <div className={`${baseBubbleClass} ${styleClass}`} dir="rtl">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]} // <--- این خط جدول رو فعال می‌کنه
                components={{
                    // شخصی‌سازی لینک‌ها
                    a: ({node, ...props}) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" />
                    ),
                    // شخصی‌سازی جدول برای اینکه توی حالت RTL و Dark Mode قشنگ دیده بشه
                    table: ({node, ...props}) => (
                        <div className="my-4 w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                            <table {...props} className="w-full text-right text-sm" />
                        </div>
                    ),
                    thead: ({node, ...props}) => (
                        <thead {...props} className="bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-200" />
                    ),
                    th: ({node, ...props}) => (
                        <th {...props} className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700 text-right" />
                    ),
                    td: ({node, ...props}) => (
                        <td {...props} className="p-3 border-b border-gray-100 dark:border-gray-800 last:border-0 align-top" />
                    )
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    );
}