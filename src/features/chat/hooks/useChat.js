// features/chat/hooks/useChat.js
export const useChat = () => {
    const addMessage = useMessageStore(state => state.addMessage); // یک اکشن اتمیک بساز

    const sendMessage = useCallback((text) => {
        addMessage({ text, isUser: true });

        // شبیه‌سازی یا کال واقعی API
        api.sendMessage(text).then(response => {
            addMessage({ text: response, isUser: false });
        });
    }, []);

    return { sendMessage };
};