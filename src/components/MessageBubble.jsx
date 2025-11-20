export default function MessageBubble({children, isUser = false}) {
    return (
        <div className={`max-w-[85%] md:max-w-[70%] lg:max-w-2xl rounded-2xl w-fit p-4 ${
            isUser
                ? 'bg-light-accent dark:bg-dark-accent text-white ms-auto rounded-br-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow me-auto rounded-bl-none'
        }`}>
            <div className="prose dark:prose-invert max-w-none">
                {children.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
            </div>
        </div>
    );
}