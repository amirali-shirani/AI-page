import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {chatServices} from "../api/chatServices.js";

export const useChat = () => {
    const queryClient = useQueryClient();
    const session = localStorage.getItem("session");
    // 1. گرفتن لیست پیام‌ها مستقیم از API
    const {data: messages = [], isLoading} = useQuery({
        queryKey: ['chat-history', session],
        queryFn: () => chatServices.getHistory(session),
        staleTime: Infinity,
    });

    const sendMessage = useMutation({
        mutationKey: ['send-chat-message'],
        mutationFn: (message) => chatServices.sendMessage(message),
        onSuccess: (newItem) => {

            queryClient.setQueryData(['chat-history',session], (oldData) => {
                return [...(oldData || []), {text: newItem.answer, isUser: false}];
            });
        },
    });

    const handleSendMessage = (text) => {
        queryClient.setQueryData(['chat-history', localStorage.getItem("session")], (oldData) => {
            return [...(oldData || []), {text: text, isUser: true}];
        });
        sendMessage.mutate(text);
    };

    return {
        messages,
        isLoading,
        handleSendMessage,
        isGenerating: sendMessage.isPending,
        isError: sendMessage.isError
    };
};