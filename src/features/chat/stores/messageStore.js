import {create} from 'zustand'

export const useMessageStore = create((set) => ({
    chatMessages: [],
    setChatMessages: (messages) => set(messages.chatMessages, messages),

    chatHistory: [],
    setChatHistory: (newChatHistory) => set({ chatHistory: newChatHistory })
}))