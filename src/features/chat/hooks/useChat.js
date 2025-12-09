import {useCallback} from "react";
import {useMessageStore} from "../stores/messageStore.js";

export const useChat = () => {
    const setChatMessage = useMessageStore(state => state.setChatMessages); // یک اکشن اتمیک بساز

    const sendMessage = useCallback((text) => {
        setChatMessage({text, isUser: true});

        // شبیه‌سازی یا کال واقعی API
        // aiService.sendMessage(text).then(response => {
        //     addMessage({ text: response, isUser: false });
        // });
    }, []);

    return {sendMessage};
};