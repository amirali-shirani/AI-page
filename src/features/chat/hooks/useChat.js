import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {chatServices} from "../api/chatServices.js";
import {useAppStore} from "../../../../store/appStore.js";
import {useRef} from "react";

export const useChat = () => {
    const queryClient = useQueryClient();

    const sessionId = useAppStore(state => state.sessionId);
    const setSessionId = useAppStore(state => state.setSessionId);
    const abortControllerRef = useRef(null);

    const {data: messagesData = {messages: []}, isLoading} = useQuery({
        queryKey: ['chat-history', sessionId],
        queryFn: () => chatServices.getHistory(sessionId),
        enabled: !!sessionId,
    });

    const sendMessage = useMutation({
        mutationKey: ['send-chat-message'],
        mutationFn: ({question, signal}) => chatServices.sendMessage(question, sessionId, signal),
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
        onError: (error) => {
            // چک میکنیم آیا خطا به خاطر کنسل شدن بوده؟
            const isAborted = error.name === 'AbortError' || error.name === 'CanceledError' || error.message === 'canceled';

            if (isAborted) {
                // دستی یک پیام "توقف" به لیست چت اضافه میکنیم
                queryClient.setQueryData(['chat-history', sessionId], (oldData) => {
                    const safeOldData = oldData || {messages: []};
                    return {
                        ...safeOldData,
                        messages: [
                            ...(safeOldData.messages || []),
                            {
                                text: "تولید پاسخ توسط کاربر متوقف شد.",
                                isUser: false,
                                isError: true // <--- این فلگ رو ست میکنیم تا توی UI قرمز بشه
                            }
                        ]
                    };
                });
            } else {
                // اگر ارور واقعی بود (مثلا قطع اینترنت)
                console.error("Chat Error:", error);
                // اینجا میتونی یه پیام ارور دیگه ادد کنی یا Toast نشون بدی
            }
        }
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
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const controller = new AbortController();
        abortControllerRef.current = controller;

        sendMessage.mutate({question, signal: controller.signal});
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
    const stopGeneration = () => {
        // ۶. لاجیک واقعی استاپ
        if (abortControllerRef.current) {
            abortControllerRef.current.abort(); // قطع کردن نتورک
            abortControllerRef.current = null;
        }
    };
    return {
        sessionId,
        messages: messagesData,
        onError: sendMessage.isError,
        isLoading,
        resetSession,
        stopGeneration,
        isMutating: sendMessage.isMutating || sendMessage.isPending,
        handleSendMessage,
        isError: sendMessage.isError,
    };
};

// سمت سرور (Backend): سشن فعلی رو حذف کنیم (تا سرور سبک بشه) و یه سشن جدید بگیریم.
//
//     سمت کلاینت (LocalStorage): آیدی سشن جدید رو جایگزین قبلی کنیم.
//
//     سمت UI (React Query): کشِ (Cache) پیام‌های قبلی رو پاک کنیم تا صفحه سفید بشه.