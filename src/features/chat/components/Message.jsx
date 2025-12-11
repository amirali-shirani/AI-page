export default function Message({message}) {
    const {text, isUser} = message;
    const bubbleClass = `
        max-w-[85%] md:max-w-[70%] lg:max-w-2xl 
        p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed
        whitespace-pre-wrap
        ${isUser
        ? 'bg-light-accent dark:bg-dark-accent text-white rounded-br-none'
        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-700'}
    `;
    return (
        <div className={bubbleClass} dir="auto">
            {text}
        </div>

    );
}