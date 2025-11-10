export default function MessageBubble({children, isUser = false}) {
    return (
        <div className={` rounded-2xl w-fit p-4 ${
            isUser
                ? 'bg-light-accent dark:bg-dark-accent text-white ms-auto rounded-bl-none'
                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 shadow me-auto rounded-br-none'
        }`}>
            <div className="prose dark:prose-invert max-w-none">
                {children.split('\n').map((line, i) => (
                    <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
            </div>
        </div>
    );
}