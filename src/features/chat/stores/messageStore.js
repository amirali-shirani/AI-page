import {create} from 'zustand'

export const useMessageStore = create((set) => ({
    chatMessages: [
        {text: "سلام! چطور می‌توانم به شما کمک کنم؟", isUser: false},
        {text: "سلام! می‌خواستم بدانم هوش مصنوعی چطور کار می‌کند؟", isUser: true}
    ],
    setChatMessages: (updater) => {
        set((state) => {
            const newMessages = typeof updater === 'function' ? updater(state.chatMessages) : updater;
            if (!Array.isArray(newMessages)) {
                console.error('setChatMessages received non-array:', newMessages);
                return { chatMessages: [] };
            }
            return { chatMessages: newMessages };
        });
    },
    chatHistory: [],
    setChatHistory: (newChatHistory) => set({ chatHistory: newChatHistory })
}))