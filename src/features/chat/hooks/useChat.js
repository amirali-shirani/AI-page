import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatServices } from "../api/chatServices.js";

export const useChat = () => {
    const savedSession = localStorage.getItem('session');
    const queryClient = useQueryClient();

    const { data: messagesData = { messages: [] }, isLoading } = useQuery({
        queryKey: ['chat-history', savedSession],
        queryFn: () => chatServices.getHistory(savedSession),
        enabled: !!savedSession, // اگه سشن نبود الکی ریکوئست نزن
    });

    const sendMessage = useMutation({
        mutationKey: ['send-chat-message'],
        mutationFn: ({ question, category }) => chatServices.sendMessage(question, savedSession, category),
        onSuccess: (newItem) => {
            queryClient.setQueryData(['chat-history', savedSession], (oldData) => {
                const safeOldData = oldData || { messages: [] };
                return {
                    ...safeOldData,
                    messages: [
                        ...(safeOldData.messages || []),
                        { text: newItem.data.answer, isUser: false }
                    ]
                };
            });
        },
    });

    const handleSendMessage = (question, category) => {
        sendMessage.mutate({ question, category });

        queryClient.setQueryData(['chat-history', savedSession], (oldData) => {
            const safeOldData = oldData || { messages: [] };
            return {
                ...safeOldData,
                messages: [
                    ...(safeOldData.messages || []),
                    { text: question, isUser: true, category }
                ]
            };
        });
    };

    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: chatServices.getCategories
    });

    return {
        categories,
        messages: messagesData,
        isLoading,
        handleSendMessage,
        isError: sendMessage.isError
    };
};