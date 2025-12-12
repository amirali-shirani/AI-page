import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {chatServices} from "../api/chatServices.js";
import {useAppStore} from "../../../../store/appStore.js";

export const useChat = () => {
    const queryClient = useQueryClient();

    const sessionId = useAppStore(state => state.sessionId);
    const setSessionId = useAppStore(state => state.setSessionId);


    const {data: messagesData = {messages: []}, isLoading} = useQuery({
        queryKey: ['chat-history', sessionId],
        queryFn: () => chatServices.getHistory(sessionId),
        enabled: !!sessionId,
    });

    const sendMessage = useMutation({
        mutationKey: ['send-chat-message'],
        mutationFn: (question) => chatServices.sendMessage(question, sessionId),
        onSuccess: (newItem) => {
            queryClient.setQueryData(['chat-history', sessionId], (oldData) => {
                const safeOldData = oldData || {messages: []};
                return {
                    ...safeOldData,
                    messages: [
                        ...(safeOldData.messages || []),
                        {text: newItem.data.answer, isUser: false, sources: newItem.data.sources}
                    ]
                };
            });
        },
    });

    const resetSession = useMutation({
        mutationFn: async () => {
            if (sessionId) {
                try {
                    await chatServices.deleteSession(sessionId);
                    localStorage.removeItem("session")
                } catch (e) {
                    console.error("Delete session failed:", e);
                }
            }
            return await chatServices.getOrCreateSession();
        },
        onSuccess: (newId) => {
            queryClient.removeQueries({queryKey: ["chat-history", sessionId]});
            setSessionId(newId);
        },

        onError: (err) => {
            console.error("Failed to reset session:", err);
        }
    })

    const handleSendMessage = (question) => {
        sendMessage.mutate(question);
        queryClient.setQueryData(['chat-history', sessionId], (oldData) => {
            const safeOldData = oldData || {messages: []};
            return {
                ...safeOldData,
                messages: [
                    ...(safeOldData.messages || []),
                    {text: question, isUser: true}
                ]
            };
        });
    };

    return {
        sessionId,
        messages: messagesData,
        isLoading,
        resetSession,
        handleSendMessage,
        isError: sendMessage.isError,
    };
};

// سمت سرور (Backend): سشن فعلی رو حذف کنیم (تا سرور سبک بشه) و یه سشن جدید بگیریم.
//
//     سمت کلاینت (LocalStorage): آیدی سشن جدید رو جایگزین قبلی کنیم.
//
//     سمت UI (React Query): کشِ (Cache) پیام‌های قبلی رو پاک کنیم تا صفحه سفید بشه.