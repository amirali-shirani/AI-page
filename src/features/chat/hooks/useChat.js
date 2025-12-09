import { useMutation } from '@tanstack/react-query';
import {useMessageStore} from "../stores/messageStore.js";
import {chatServices} from "../api/chatServices.js";

export const useChat = () => {
    const setChatMessages = useMessageStore(state => state.setChatMessages);

    const mutation = useMutation({
        mutationFn: (message) => chatServices.sendMessage(message),
        onSuccess: (data) => {
            console.log("data" ,data)
            setChatMessages(prev => [...prev, {
                text: data.answer || data.message || "پاسخی دریافت شد",
                isUser: false
            }]);
        },

        onError: (error) => {
            console.error("Chat Error:", error);
            setChatMessages(prev => [...prev, {
                text: "متاسفانه مشکلی پیش آمد. لطفا دوباره تلاش کنید.",
                isUser: false,
                isError: true
            }]);
        }
    });

    const sendMessage = (text) => {
        setChatMessages(prev => [...prev, { text, isUser: true }]);
        mutation.mutate(text);
    };

    return {
        sendMessage,
        isLoading: mutation.isPending, // این همان چیزی است که برای لودینگ می‌خواهی
        isError: mutation.isError
    };
};