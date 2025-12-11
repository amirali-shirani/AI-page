import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatServices } from "../api/chatServices.js";

export const useChat = () => {
    const savedSession = localStorage.getItem('session');
    const queryClient = useQueryClient();

    const { data: messagesData = { messages: [] }, isLoading } = useQuery({
        queryKey: ['chat-history', savedSession],
        queryFn: () => chatServices.getHistory(savedSession),
    });

    const sendMessage = useMutation({
        mutationKey: ['send-chat-message'],
        mutationFn: (message) => chatServices.sendMessage(message, savedSession),
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

    const handleSendMessage = (text) => {
        sendMessage.mutate(text);
        queryClient.setQueryData(['chat-history', savedSession], (oldData) => {
            console.log("Updating UI Optimistically...");
            return {
                ...oldData,
                messages: [
                    ...(oldData?.messages || []),
                    { text: text, isUser: true }
                ]
            };
        });


    };

    return {
        messages: messagesData,
        isLoading,
        handleSendMessage,
        isError: sendMessage.isError
    };
};